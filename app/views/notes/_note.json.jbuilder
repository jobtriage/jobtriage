# frozen_string_literal: true

json.extract! note, :title, :content
json.id note.id.to_s