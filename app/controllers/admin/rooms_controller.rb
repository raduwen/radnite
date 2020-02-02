# frozen_string_literal: true

module Admin
  class RoomsController < ApplicationController
    before_action :set_room, only: %i[show edit update destroy]

    def index
      @rooms = Room.all
    end

    def show; end

    def new
      @room = Room.new
    end

    def create
      @room = Room.new(room_params)

      if @room.save
        redirect_to action: :show
      else
        render :new
      end
    end

    def edit; end

    def update
      if @room.update(room_params)
        redirect_to action: :show
      else
        render :edit
      end
    end

    def destroy
      @room.destroy
      redirect_to action: :index
    end

    private

    def room_params
      params.require(:room).permit(
        :id,
        :title
      )
    end

    def set_room
      @room = Room.find(params[:id])
    end
  end
end
