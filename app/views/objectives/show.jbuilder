json.objective do
  json.partial!(@objective)

  json.parent_key_result do
    json.partial!(@objective.parent_key_result) if @objective.parent_key_result
  end

  json.key_results do
    json.array!(@objective.sorted_key_results) do |key_result|
      json.partial!(key_result)

      json.child_objectives do
        json.array!(key_result.child_objectives) do |objective|
          json.partial!(objective)

          json.key_results do
            json.partial! 'key_results/key_result', collection: objective.sorted_key_results, as: :key_result
          end
        end
      end
    end
  end
end
