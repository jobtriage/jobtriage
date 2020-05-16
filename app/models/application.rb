class Application
  include Mongoid::Document
  include Mongoid::Timestamps


  field :title, type: String
  field :description, type: String
  field :url, type: String
  field :location, type: String
  field :status, type: String
  field :priority, type: Integer
  field :company, type: Hash

  has_many :notes, dependent: :destroy
  has_many :timelogs, dependent: :destroy

  belongs_to :user

  validates :title, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :company, presence: true

  def set_company(name, url)
    if self.company == nil
      self.company = { name: '', url: nil }
    end
    url = url == nil ? self.company[:url] : url
    self.company = { name: name, url: url }
  end
end
