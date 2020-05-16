module ExceptionHandler
  extend ActiveSupport::Concern

   # Define custom error subclasses - rescue catches `StandardErrors`
  class NotAuthenticated < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end
  class ExpiredSignature < StandardError; end
  class DecodeError < StandardError; end
  
  included do
    # Define custom handlers
    rescue_from ExceptionHandler::NotAuthenticated, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
    rescue_from ExceptionHandler::ExpiredSignature, with: :four_ninety_eight
    rescue_from ExceptionHandler::DecodeError, with: :four_zero_one
    rescue_from Exception, with: :default_error

  end

  private

  # JSON response with message; Status code 422 - unprocessable entity
  def four_twenty_two(e)
   render json: { error: e.message }, status: :unprocessable_entity
  end

  def four_ninety_eight(e)
    render json: { error: e.message }, status: :unauthorized
  end

  # JSON response with message; Status code 401 - Unauthorized
  def four_zero_one(e)
    render json: { error: e.message }, status: :unauthorized
  end

  def unauthorized_request(e)
    render json: { error: e.message }, status: :unauthorized
  end

  def default_error(e)
    render json: { error: e.message }, status: :internal_server_error
  end
end
