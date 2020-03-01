class Note
  include Mongoid::Document
  field :content, type: String
  embedded_in :application

  validates :content, presence: true

  def as_json(*args)
    res = super
    res['_id'] = self.id.to_s
    res
  end
end
