import { useToken } from './token';
import { useState } from 'react';
import cat_avatar from './avatar-pics/cat_avatar.png';
import dog_avatar from './avatar-pics/dog_avatar.png';
import lion_avatar from './avatar-pics/lion_avatar.png';
import panda_avatar from './avatar-pics/panda_avatar.png';
import shark_avatar from './avatar-pics/shark_avatar.png';
import './user.css';

function AvatarDropdown(props) {
  const { animals, value, onChange } = props;

  return (
    <select value={value} onChange={onChange} className="form-select">
      {animals.map((animal) => (
        <option key={animal.value} value={animal.value}>
          {animal.label}
        </option>
      ))}
    </select>
  );
}

function BootstrapInput(props) {
    const {id, placeholder, labelText, value, onChange, type } = props;

    return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      ></input>
    </div>
    );
}

function Signup() {
    const { token, signup } = useToken();
    const [username, setUsername] =  useState('');
    const [password, setPassword] = useState('');
    const [full_name, setName] =  useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const animalOptions = [
    {
      value: "",
      label: "Please select an avatar",
    },
    {
      value: dog_avatar,
      label: "Dog",
    },
    {
      value: cat_avatar,
      label: "Cat",
    },
    {
      value: panda_avatar,
      label: "Panda",
    },
    {
      value: shark_avatar,
      label: "Shark",
    },
    {
      value: lion_avatar,
      label: "Lion",
    },
  ];

    async function handleSubmit(event) {
        event.preventDefault();
        signup(username, password, full_name, email, avatar);
        localStorage.setItem(token, "tokenValue");
    }

    return(
        <div className="user_component" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}></div>
                <div className="signuppagecontainer">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <h3 className="card-title">Signup</h3>
                            <BootstrapInput
                                id="name"
                                placeholder="name"
                                value={full_name}
                                onChange={e => setName(e.target.value)}
                                type="text" />
                            <BootstrapInput
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email" />
                            <BootstrapInput
                                id="username"
                                placeholder="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                type="username" />
                            <BootstrapInput
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password" />
                            <div className="mb-4">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <AvatarDropdown
                                animals={animalOptions}
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-dark">Create</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default Signup
