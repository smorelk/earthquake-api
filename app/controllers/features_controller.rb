class FeaturesController < ApplicationController
  before_action :validate_params, only: :index

  # GET /features
  def index
    render_data @features, @page, @per_page
  end

  # POST /features/:id/comment
  def create_comment
    content = params[:body] if params[:body]
    id = params[:id] if params[:id]
    c = Comment.new(feature_id: id, body: content)
    if c.save
      render json: { message: "Comment successfully submitted to feature #{id}"}
    else
      render json: { error: c.errors }
    end
  end

  private

  def validate_params
    # Default values
    @page= params["page"] || 1
    @per_page = params["per_page"] || 50

    valid_mag_types = Set["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"]

    render json: {error: "per_page cannot be greater than 1000"}  if @per_page > 1000

    if params.has_key?("mag_type") and valid_mag_types.include?(params[:mag_type])
      @features = Feature.where(magType:params["mag_type"]).page(@page).per(@per_page)
    else
      @features = Feature.all.page(@page).per(@per_page)
    end
  end

  def render_data(features, page, per_page)
    serialized = ActiveModelSerializers::SerializableResource.new(features)
    response = {
      'data': serialized,
      'pagination': {
        'current_page': page,
        'total': features.length,
        'per_page': per_page
      }
    }
    render json: response
  end
end
