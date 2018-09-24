# frozen_string_literal: true

json.key_results do
  json.partial! "key_results/key_result", collection: @key_results, as: :key_result
end
