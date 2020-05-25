class ApplicationsController < ApplicationController

  before_action :set_applications
  before_action :set_application, except: %i[index create]

  def index
  end

  def show
  end

  def create
    @application = @applications.new(application_params)
    @application.set_company params[:company_name], params[:company_url]
    render(:show, status: :ok) if @application.save!
  end

  def update
    if params[:company_name]
      @application.set_company params[:company_name], params[:company_url]
    end

    render(:show,status: :ok) if @application.update_attributes!(application_params)
  end

  def destroy
    @application.destroy
    render(:show, status: :ok)
  end

  private

  def set_application
    @application = @applications.find(id: params[:id])
  end

  def set_applications
    @applications = current_user.applications
  end

  def application_params
    params.permit(:title, :description, :url, :location, :status, :priority)
  end
end
