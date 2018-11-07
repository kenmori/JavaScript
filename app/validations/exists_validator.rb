class ExistsValidator < Module
  def initialize(klass, id_column_name)
    @validate_method = -> {
      return if __send__(id_column_name).blank?

      unless klass.exists?(id: __send__(id_column_name))
        errors.add(id_column_name, :not_found)
      end
    }
  end

  def included(base)
    base.validate @validate_method
  end
end
