# frozen_string_literal: true

json.array! @time_logs do |time_log|
    json.partial! 'timelog', time_log: time_log
end