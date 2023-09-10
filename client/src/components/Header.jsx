/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

export const Header = ({ users, selectedUserId, setSelectedUserId }) => {
  return (
    <header className="Header" key={selectedUserId}>
      <div className="Header-user">
        <select
          value={selectedUserId}
          onChange={(e) => {
            setSelectedUserId(e.target.value);
          }}
        >
          <option>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;

Comment.propTypes = {
  users: PropTypes.any,
  selectedUserId: PropTypes.string,
  setSelectedUserId: PropTypes.any,
};
