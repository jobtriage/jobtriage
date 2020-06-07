# frozen_string_literal: true
json.extract! application, :title, :description, :url, :location, :status, :priority, :company
json.id application.id.to_s
json._id application.id.to_s

json.notes application.notes.each do |note|
   json.partial! 'notes/note', note: note
end

json.timelogs application.timelogs.each do |timelog|
   json.partial! 'timelogs/timelog', time_log: timelog
end
