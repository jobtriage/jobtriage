class Note
  include Mongoid::Document
  field :title, type: String
  field :content, type: String
  belongs_to :application

  validates :content, presence: true
  validates :title, presence: true

  def as_json(*args)
    res = super
    res['_id'] = id.to_s
    res['id'] = id.to_s
    res['application_id'] = application_id.to_s
    res
  end
end
