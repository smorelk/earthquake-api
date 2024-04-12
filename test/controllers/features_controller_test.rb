require "test_helper"

class FeaturesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @feature = features(:one)
  end

  test "should get index" do
    get features_url, as: :json
    assert_response :success
  end

  test "should create feature" do
    assert_difference("Feature.count") do
      post features_url, params: { feature: { external_id: @feature.external_id, latitude: @feature.latitude, longitude: @feature.longitude, magType: @feature.magType, magnitude: @feature.magnitude, place: @feature.place, time: @feature.time, title: @feature.title, tsunami: @feature.tsunami, url: @feature.url } }, as: :json
    end

    assert_response :created
  end

  test "should show feature" do
    get feature_url(@feature), as: :json
    assert_response :success
  end

  test "should update feature" do
    patch feature_url(@feature), params: { feature: { external_id: @feature.external_id, latitude: @feature.latitude, longitude: @feature.longitude, magType: @feature.magType, magnitude: @feature.magnitude, place: @feature.place, time: @feature.time, title: @feature.title, tsunami: @feature.tsunami, url: @feature.url } }, as: :json
    assert_response :success
  end

  test "should destroy feature" do
    assert_difference("Feature.count", -1) do
      delete feature_url(@feature), as: :json
    end

    assert_response :no_content
  end
end
