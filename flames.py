def flames(your_name, partner_name):
    # Convert names to lowercase and remove spaces
    your_name = your_name.lower().replace(" ", "")
    partner_name = partner_name.lower().replace(" ", "")

    # Find the common letters between the two names
    common_letters = set(your_name).intersection(partner_name)

    # Count the remaining letters in both names
    your_count = len(your_name) - len(common_letters)
    partner_count = len(partner_name) - len(common_letters)

    # Calculate the number of flames
    flames_count = your_count + partner_count
    flames_list = list("flames")

    # Remove letters from the flames list
    while len(flames_list) > 1:
        index = flames_count % len(flames_list)
        flames_list.pop(index - 1)

    # Determine the final result
    result = {
        "f": "Friends",
        "l": "Lovers",
        "a": "Affectionate",
        "m": "Marriage",
        "e": "Enemies",
        "s": "Siblings",
    }[flames_list[0]]

    return result


# Get names from user
your_name = input("Enter your name: ")
partner_name = input("Enter your partner's name: ")

# Calculate FLAMES result
result = flames(your_name, partner_name)

# Display the result
print("The result of the FLAMES game between", your_name, "and", partner_name, "is:", result)
