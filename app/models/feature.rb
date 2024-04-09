class Feature < ApplicationRecord
  # Ensure fields are not null
  validates :title, presence: true
  validates :url, presence: true
  validates :place, presence: true
  validates :magType, presence: true

  # Ensure numeric fields are within range
  validates :magnitude, inclusion: -1.0..10.0
  validates :latitude, inclusion: -90.0..90.0
  validates :longitude, inclusion: -180.0..180.0

  # Association with comments
  #
  has_many :comments
end
