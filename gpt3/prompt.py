PROMTABLE_EXAMPLES = {
'DecreaseBrightness': """
Intent: DecreaseBrightness
Available slots: room
2 Utterances:
- Turn down the lights in the [kitchen](room)
- Decrease the lighting in the [bedroom](room)
""",

'GetWeather': """
Intent: GetWeather
Available slots: country, city, state
3 Utterances:
- Tell me the weather forecast for [Canada](country)
- Will there be wind in [Palo Alto](city), [California](state)
- What is the weather forecast
""",

'Greeting': """
Intent: Greeting
No available slots
2 Utterances:
- Good morning!
- Hi, how are you?
""",

'ContactSales': """
Intent: ContactSales
Available slots: name
3 Utterances:
- i'd like to call [Johnnie Essig](name)
- I wanna talk to your sales guy
- I would like to have a demo scheduled
""",

'BookRestaurant': """
Intent: BookRestaurant
Available slots: party_size_number, restaurant_name, restaurant_type, country, city, time_range
6 Utterances:
- Book a reservation for [seven](party_size_number) at a [bakery](restaurant_type) in [Osage City](city)
- Book spot for [three](party_size_number) at [Maid-Rite Sandwich Shop](restaurant_name) in [UK](country)
- I need a table for [breakfast](time_range) in [Houston](city) at the [pizzeria](restaurant_type)
- Book a restaurant reservation for [2 pm](time_range) in [Faysville](city)
- book a [restaurant](restaurant_type) in [Georgia](country)
- Lets eat in [San Francisco](city)
""",
}

PROMPT_INIT = """
Intent: {intent}
{slots_init}
{n} Utterances:
""".strip('\n')

SLOTS_INIT = [
    "No available slots",
    "Available slots: {slots}",
]

OPTIONAL_EXAMPLE = "\n- {example}\n-"