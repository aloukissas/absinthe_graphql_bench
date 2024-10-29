defmodule AbsintheTestWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :absinthe_test

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json, Absinthe.Plug.Parser],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug AbsintheTestWeb.Plugs.Bench

  plug Absinthe.Plug, schema: AbsintheTestWeb.Schema
end
