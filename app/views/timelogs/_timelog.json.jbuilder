# frozen_string_literal: true

json.extract! time_log, :type, :note, :time
json.id time_log.id.to_s