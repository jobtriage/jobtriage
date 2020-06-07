# frozen_string_literal: true

json.array! @applications do |application|
    json.partial! 'application', application: application
end
