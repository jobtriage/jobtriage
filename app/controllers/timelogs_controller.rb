class TimelogsController < ApplicationController
  def index
    render json: { message: timelogs }, status: :ok
  end

  def create
    timelog = timelogs.create!(timelog_params)
    render json: { message: timelog }, status: :created
  end

  def update
    timelog = timelogs.find(id: params[:id])
    if timelog.update_attributes!(timelog_params)
      render json: { message: timelog }, status: :ok
    end
  end

  def destroy
    timelogs.find(id: params[:id]).destroy
  end

  private

  def timelogs
    application = current_user.applications.find(id: params[:application_id])
    @timelogs = application.timelogs
  end

  def timelog_params
    params.require(:timelog).permit(:type, :note, :time, :application_id)
  end
end
