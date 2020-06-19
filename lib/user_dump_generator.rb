# frozen_string_literal: true

class UserDumpGenerator
  class << self
      def generate(user)
        CSV.generate do |csv|
            csv << ['Name', 'Email']
            csv << [user.name, user.email]
            csv << ['']
            csv << ['']
            csv << ['Pitch']
            csv << [user.pitch.pitch]
            csv << ['']
            csv << ['']
            csv << ['Self Analysis']
            user.analyses.each do |analysis|
              csv << [analysis.title, analysis.content]
            end
            csv << ['']
            csv << ['']
            csv << ['Applications']
            user.applications.each_with_index do |app, index|
              csv << [index+1, 'Details']
              csv << ['','','Job Title', 'Company Name', 'Company Url', 'Description', 'Status', 'Priority', 'Location', 'Job Url']
              csv << ['','', app.title, app.company[:name], app.company[:url], app.description, app.status, app.priority, app.location, app.url]
              csv << ['','Notes']
              csv << ['','','Title', 'Content']
              app.notes.each do |note|
                csv << ['','', note.title, note.content]
              end
              csv << ['','Timelogs']
              csv << ['','', 'Type', 'Note', 'Time']
              app.timelogs.each do |timelog|
                csv << ['','', timelog.type, timelog.note, timelog.time]
              end
              csv << ['']
            end
          end
      end
  end
end