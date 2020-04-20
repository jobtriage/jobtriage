class PitchesController < ApplicationController
  def show
    render json: { message: pitch }, status: :ok
  end

  def create
    render json: { message: pitch }, status: :ok if pitch.update_attributes!(pitch_params)
  end

  def update
    render json: { message: pitch }, status: :ok if pitch.update_attributes!(pitch_params)
  end

  private

  def pitch_params
    params.permit(:pitch)
  end

  def pitch
    return current_user.pitch if current_user.pitch

    Pitch.create(user_id: current_user.id, pitch: '')
  end
end
