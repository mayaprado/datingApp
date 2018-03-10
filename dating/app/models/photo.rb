class Photo < ApplicationRecord
  balongs_to :user
  before_action :ensure_signed_in

  def index
    @photos = current_user.photos.all
  end

  def show
    @photo = current_user.photos.find(params[:id])
  end
end
