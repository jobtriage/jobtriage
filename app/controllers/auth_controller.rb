class AuthController < ApplicationController
  skip_before_action :authenticate_request, only: %i[login register verify_email generate_otp verify_otp] 

  # POST /register
  def register
    @user = User.create(user_params)
    @user.password = params[:password]
    if @user.save
      authenticate_user
      UserMailer.with(user: @user).welcome_email.deliver_now
      response = { message: 'User created successfully' }
      render json: response, status: :ok
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
  end

  def logout
    cookies.delete :token
    render json: { message: 'Logged out'}, status: :ok
  end

  def test
    render json: { message: current_user }, status: :ok
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
        render json: { message: 'Password updated' }, status: :ok
      end
    else
      render json: { message: 'Password mismatch' }, status: :bad_request
    end
  end

  def generate_otp
    user = User.find_by(email: params[:email])
    if user
      user.generate_reset_token
      user.update
      UserMailer.with(user: user).forgot_password_email.deliver_now

      render json: { message: 'OTP sent check mail' }, status: :ok
    else
      render json: { message: 'Email not registered' }, status: :bad_request
    end
  end

  def verify_otp
    begin
      user = User.find_by(email: params[:email])
    rescue
      return render json: { message: 'Email not valid' }, status: :bad_request
    end

    if user&.reset_token == params[:otp]
      user.password = params[:password]
      render json: { message: 'Password updated' }, status: :ok if user.save
    else
      render json: { message: 'OTP mismatch' }, status: :bad_request
    end
  end

  private

  def user_params
    params.permit(:email, :name)
  end

  def authenticate_user
    user = User.find_by(email: params[:email])
    if user.password == params[:password]
      token = JsonWebToken.encode(user_id: user.id.to_s)
      cookies[:token] = { value: token, expires: 100.days.from_now, httponly: true }
      return token
    end

    nil
  end
end
