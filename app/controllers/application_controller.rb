class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_request
  attr_reader :current_user

  include ExceptionHandler

  private

  def authenticate_request
    token = get_auth_token
    if token
      user_id = JsonWebToken.decode(token)[:user_id]
      @current_user = User.find_by(id: user_id)
    end
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def get_auth_token
    return cookies[:token] if cookies[:token]
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    end
    nil
  end
end
