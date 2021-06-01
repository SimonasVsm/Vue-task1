import { render, fireEvent } from "@testing-library/vue"

import ProductListItem from "../components/ProductListItem/ProductListItem.vue"

describe("Test ProductListItemComponent", () => {
  const item = {
    id: 1,
    favorite: false,
    title: "Item Name",
    price: 120,
  }

  function r() {
    return render(ProductListItem, {
      props: { item },
    })
  }

  it("renders correctly with provided props", () => {
    const { getByText } = r()
    expect(getByText(item.title)).toBeInTheDocument()
  })

  it("emits edit-item event on edit button click", async () => {
    const { getByRole, emitted } = r()

    const editBtn = getByRole("button", { name: /edit/i })
    await fireEvent.click(editBtn)
    expect(emitted()["edit-item"]).toBeTruthy()
  })

  it("emits delete-item event, on delete button click", async () => {
    const { getByRole, emitted } = r()

    const deleteBtn = getByRole("button", { name: /delete/i })
    await fireEvent.click(deleteBtn)
    expect(emitted()["delete-item"]).toBeTruthy()
  })
})
