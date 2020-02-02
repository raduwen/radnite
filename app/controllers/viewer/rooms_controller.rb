# frozen_string_literal: true

module Viewer
  class RoomsController < ApplicationController
    before_action :set_room, only: %i[show]

    def show; end

    private

    def set_room
      @room = Room.find(params[:id])
    end
  end
end
