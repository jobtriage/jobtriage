class TimelogsController < ApplicationController

  before_action :set_application
  before_action :set_timelogs
  before_action :set_timelog,  only: %i[update show destroy]

  def index
  end

  def create
    @time_log = @time_logs.create!(timelog_params)
    render(:show, status: :created)
  end

  def update
    render(:show, status: :ok) if @time_log.update_attributes!(timelog_params)
  end

  def destroy
    @time_log.destroy
    render(:show, status: :ok)
  end

  private

  def set_timelogs
    @time_logs = @application.timelogs
  end

  def set_timelog
    @time_log = @time_logs.find(id: params[:id])
  end

  def set_application
    @application = current_user.applications.find(id: params[:application_id])
  end

  def timelog_params
    params.require(:timelog).permit(:type, :note, :time)
  end
end
