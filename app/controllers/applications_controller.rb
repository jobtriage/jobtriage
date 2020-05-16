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
  rescue StandardError
    raise CustomError, 'Error in creating Job Application!!!'
  end

  def update
    if params[:company_name]
      @application.set_company params[:company_name], params[:company_url]
    end

    render(:show,status: :ok) if @application.update_attributes!(application_params)
  rescue StandardError
    raise CustomError, 'Error in updating Job Application!!!'
  end

  def destroy
    @application.destroy
    render(:show, status: :ok)
  end

  private

  def set_application
    @application = @applications.find(id: params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    raise CustomError, 'Application Not found!!!'
  end

  def set_applications
    @applications = current_user.applications
  end

  def application_params
    params.permit(:title, :description, :url, :location, :status, :priority)
  end
end
