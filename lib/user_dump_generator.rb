# frozen_string_literal: true
require "prawn"

class UserDumpGenerator
  class << self
      def generate(user)

        Prawn::Document.new do
          text "Name: #{user.name}"
          text "Email: #{user.email}"
          text "\n"
          text "Pitch"
          text user.pitch.pitch, :indent_paragraphs => 30
          text "\n"
          text "Self Analysis"

          user.analyses.each_with_index do |analysis, index|
            text "#{index+1}. " + analysis.title, :indent_paragraphs => 30
            text analysis.content, :indent_paragraphs => 35
            text "\n"
          end
          text "\n"*2
          text "Applications"
          text "\n"

          app_len = user.applications.length

          user.applications.each_with_index do |app, index|

            text "Title:  #{app.title}", :indent_paragraphs => 30
            text "Company Name:   #{app.company[:name]}", :indent_paragraphs => 30
            text "Company Url: #{app.company[:url]}", :indent_paragraphs => 30
            text "Description: #{app.description}", :indent_paragraphs => 30
            text "Status: #{app.status}", :indent_paragraphs => 30
            text "Priority: #{app.priority}", :indent_paragraphs => 30
            text "Location: #{app.location}", :indent_paragraphs => 30
            text "Job Url: #{app.url}", :indent_paragraphs => 30
            text "\n"

            if app.notes.length > 0
              text "Notes", :indent_paragraphs => 30 
              app.notes.each do |note|
                text note.title, :indent_paragraphs => 35
                text note.content, :indent_paragraphs => 35
                text "\n"              
              end
              text "\n"
            end

            if app.timelogs.length > 0
              text "Timelogs", :indent_paragraphs => 30
              app.timelogs.each do |timelog|
                text timelog.type, :indent_paragraphs => 35
                text timelog.note, :indent_paragraphs => 35
                text timelog.time.strftime("%d-%b-%Y"), :indent_paragraphs => 35
                text "\n"              
              end
            end

            text "\n"*5  if index < app_len -1

          end
        end.render
        
      end
  end
end