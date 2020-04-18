class Timelog
  include Mongoid::Document
  field :type, type: String
  field :note, type: String
  field :time, type: DateTime
  belongs_to :application

  validates :type, presence: true

  def as_json(*args)
    res = super
    res['_id'] = id.to_s
    res['id'] = id.to_s
    res['application_id'] = application_id.to_s
    res
  end
end
