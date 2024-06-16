const User = () => {
  return (
    <div class="card paint-card">
      <div class="card-body">
        <h4 class="form-signin-heading text-center">Book Details</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">SL No</th>
              <th scope="col">Name</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">ISBN</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <img src={c} width="50px" height="50px" />
              </td>
              <td></td>
              <td>Demo</td>
              <td>Programming</td>
              <td>description</td>
              <td>ISBN</td>
              <td>200</td>

              <td>
                <Link to="/editBook" class="btn btn-sm btn-primary">
                  Edit
                </Link>
                <Link to="delete" class="btn btn-sm btn-danger">
                  Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { User };
