module ExceptionHandler
  extend ActiveSupport::Concern

   # Define custom error subclasses - rescue catches `StandardErrors`
  class NotAuthenticated < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end
  class ExpiredSignature < StandardError; end
  class DecodeError < StandardError; end
  class CustomError < StandardError; end
  
  included do
    # Define custom handlers
    rescue_from ExceptionHandler::NotAuthenticated, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
    rescue_from ExceptionHandler::ExpiredSignature, with: :four_ninety_eight
    rescue_from ExceptionHandler::DecodeError, with: :four_zero_one
    rescue_from ExceptionHandler::CustomError, with: default_error
    rescue_from Exception, with: :default_error

  end

  private

  # JSON response with message; Status code 422 - unprocessable entity
  def four_twenty_two(e)
   print_log e
   render json: { error: 'Unprocessable Request!!!' }, status: :unprocessable_entity
  end

  def four_ninety_eight(e)
    print_log e
    render json: { error: 'You are not Authorized!!!'}, status: :unauthorized
  end

  # JSON response with message; Status code 401 - Unauthorized
  def four_zero_one(e)
    print_log e
    render json: { error: 'You are not Authorized!!!' }, status: :unauthorized
  end

  def unauthorized_request(e)
    print_log e
    render json: { error: 'You are not Authorized!!!' }, status: :unauthorized
  end

  def default_error(e)
    print_log e
    render json: { error: 'Something went Wrong!!!' }, status: :internal_server_error
  end

  def print_log(e)
    Rails.logger.error e.message
    Rails.logger.error e.backtrace
  end
end
