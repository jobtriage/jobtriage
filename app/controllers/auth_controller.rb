class AuthController < ApplicationController
  skip_before_action :authenticate_request, only: %i[login register]

  # POST /register
  def register
    @user = User.create(user_params)
    @user.password = params[:password]
    if @user.save
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

  def test
    render json: { message: current_user }, status: :ok
  end

  private

  def user_params
    params.permit(:email, :name)
  end

  def authenticate_user
    user = User.find_by(email: params[:email])
    if user.password == params[:password]
      token = JsonWebToken.encode(user_id: user.id.to_s)
      cookies[:token] = { value: token, expires: 20.days.from_now, httponly: true }
      return token
    end

    nil
  end
end
