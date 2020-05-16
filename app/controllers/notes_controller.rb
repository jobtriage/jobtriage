class NotesController < ApplicationController

  before_action :set_application
  before_action :set_notes
  before_action :set_note,  only: %i[update show destroy]

  def index
  end

  def create
    @note = @notes.create(notes_params)
    render(:show, status: :created)
  end

  def update
    render(:show, status: :ok) if note.update_attributes!(notes_params)
  end

  def destroy
    @note.destroy
    render(:show, status: :ok)
  end

  private

  def set_notes
    @notes = @application.notes
  end

  def set_note
    @note = @notes.find(id: params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    raise CustomError, 'Note Not found!!!'
  end

  def set_application
    @application = current_user.applications.find(id: params[:application_id])
  rescue Mongoid::Errors::DocumentNotFound
    raise CustomError, 'Application Not found!!!'
  end

  def notes_params
    params.permit(:content, :title)
  end
end
