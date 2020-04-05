class AuthController < ApplicationController
  skip_before_action :authenticate_request, only: %i[login register verify_email]

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
    if user
      user.update_attributes(email_confirmed: true)
    end

    redirect_to ENV['CLIENT_HOST']
  end

  def resend_email
    puts current_user
    if !current_user.confirm_token
      current_user.generate_confirm_token
      current_user.update
    end

    UserMailer.with(user: current_user).welcome_email.deliver_now
    render json: { message: 'Mail sent' }, status: :ok
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
