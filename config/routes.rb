# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :admin do
    resources :rooms
  end

  namespace :viewer do
    resources :rooms, only: :show
  end
end
