defmodule AbsintheTestWeb.Resolvers.Author do
  @author_data AbsintheTest.Data.generate_data()

  def all(_parent, _args, _resolution) do
    {:ok, @author_data}
  end
end
