class AuthController < ApplicationController
  
  skip_before_action :authenticate_request, only: %i[login register verify_email generate_otp verify_otp] 
  before_action :set_user, only: %i[login verify_otp generate_otp]

  # POST /register
  def register
    @user = User.create(user_params)
    @user.password = params[:password]
    if @user.save
      render json: { message: 'User created successfully' }, status: :ok
    else
      render json: { message: @user.errors }, status: :bad_request
    end
  end

  def login
    token = authenticate_user
    if token
      render json: { message: { token: token } }, status: :ok
    else
      render json: { message: 'Password mismatch' }, status: :bad_request
    end
  rescue StandardError
    raise CustomError, 'Login failed'
  end

  def logout
    cookies.delete :token
    render json: { message: 'Logged out'}, status: :ok
  end

  def test
    @user = current_user
    render 'user/show'
  end

  def verify_email
    user = User.find_by confirm_token: params[:token]
    user&.update_attributes(email_confirmed: true)

    redirect_to ENV['CLIENT_HOST']
  end

  def resend_email
    unless current_user.confirm_token
      current_user.generate_confirm_token
      current_user.update
    end
    UserMailer.with(user: current_user).welcome_email.deliver_now
    render json: { message: 'Mail sent' }, status: :ok
  end

  def change_password
    if current_user.password == params[:current_password]
      current_user.password = params[:password]
      if current_user.update
        render json: { message: 'Password upated' }, status: :ok
      end
    else
      render json: { message: 'Password mismatch' }, status: :bad_request
    end
  end

  def generate_otp
    @user.generate_otp    
    render json: { message: 'OTP sent check mail' }, status: :ok
  rescue StandardError
    raise CustomError, 'OTP Generation Failed!!!'
  end

  def verify_otp
    if @user&.reset_token == params[:otp]
      @user.password = params[:password]
      render json: { message: 'Password updated' }, status: :ok if @user.save
    else
      render json: { message: 'OTP missmatch' }, status: :bad_request
    end
  rescue StandardError
    raise CustomError, 'OTP Verification Failed!!!'
  end

  private

  def user_params
    params.permit(:email, :name)
  end

  def authenticate_user
    if @user.password == params[:password]
      token = JsonWebToken.encode(user_id: @user.id.to_s)
      cookies[:token] = { value: token, expires: 100.days.from_now, httponly: true }
      return token
    end

    nil
  end

  def set_user
    @user = User.find_by(email: params[:email])
  rescue Mongoid::Errors::DocumentNotFound
    raise NotAuthenticated, 'Email not valid'
  end
end
