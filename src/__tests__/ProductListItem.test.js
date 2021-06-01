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
    // console.log(emitted("edit-item"))
    expect(emitted("edit-item")).toHaveProperty("edit-item")

    // can't figure out this part. Should I use jest.fn() and return emitted('edit-item') from it?
    // const mock = jest.fn() // returns emitted object
    // expect(
    //   mock).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       "edit-item": expect.any(Array),
    //     })
    //   )
    // )
  })

  it("emits delete-item event, on delete button click", async () => {
    const { getByRole, emitted } = r()

    const deleteBtn = getByRole("button", { name: /delete/i })
    await fireEvent.click(deleteBtn)
    expect(emitted("delete-item")).toBeTruthy()
  })
})
