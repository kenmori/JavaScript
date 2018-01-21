module ApplicationHelper
  def decorate!(obj)
    ActiveDecorator::Decorator.instance.decorate(obj)
  end
end
