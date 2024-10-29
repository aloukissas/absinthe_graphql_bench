defmodule AbsintheTest.Data do
  def generate_data do
    Enum.map(1..20, fn _ ->
      books =
        Enum.map(1..3, fn _ ->
          %{
            id: Ecto.UUID.generate(),
            name: Faker.Internet.domain_name(),
            num_pages: :rand.uniform(1000)
          }
        end)

      %{
        id: Ecto.UUID.generate(),
        name: Faker.Person.name(),
        company: Faker.Company.buzzword(),
        books: books
      }
    end)
  end
end
