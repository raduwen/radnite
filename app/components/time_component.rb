# frozen_string_literal: true

class TimeComponent < BaseComponent
  attr_accessor :text_size, :text_color, :edge_size, :edge_color, :position

  # TODO: validation
  # - text_size, edge_size int > 0
  # - text_color, edge_color いろっぽいもの
  # - position: left_bottom, right_bottom, left_top, right_top
end
