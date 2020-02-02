# frozen_string_literal: true

class Room < ApplicationRecord
  validates :title, presence: true
end
