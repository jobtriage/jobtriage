class Pitch
  include Mongoid::Document
  include Mongoid::Timestamps

  field :pitch, type: String
  validates :pitch, presence: true
  
  belongs_to :user

  def as_json(*args)
    res = super
    res['_id'] = id.to_s
    res['id'] = id.to_s
    res['user_id'] = user_id.to_s
    res
  end
end
