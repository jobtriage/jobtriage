class PitchesController < ApplicationController

  before_action :set_pitch, except: %i[create]

  def show
  end

  def create
    @pitch = current_user.create_pitch(pitch_params)
    render(:show, status: :created)
  rescue StandardError
    raise CustomError, 'Error in creating Pitch!!!'
  end

  def update
    render(:show, status: :ok) if @pitch.update_attributes!(pitch_params)
  end

  private

  def pitch_params
    params.permit(:pitch)
  end

  def set_pitch
    @pitch = current_user.pitch
  end
end
