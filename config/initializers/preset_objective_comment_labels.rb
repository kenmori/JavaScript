# frozen_string_literal: true

module PresetObjectiveCommentLabels
  module Objective
    DEFAULT_LABELS = [
      {
        name: "アナウンスメント",
        color: "green"
      }
    ].map(&:freeze).freeze
  end
end
