## Plumier
Delightful NodeJS Web Api Framework powered by KoaJs and TypeScript

---

I Ketut Sandiarsa

Developer VetVision

---

### Plumier
* Fokus pada *development happyness*
* Performance (KoaJS) [bit.ly/PlumBench](bit.ly/PlumBench)
* TypeScript

---

### Framework Sejenis
* LoopBack 4
* NestJS
* TypeStack/Routing Controller

---

### Fitur-fitur Plumier

---

### Parameter Binding

```typescript
class UsersController {
  get(id:string){

  }
}
```

```
GET /users/get?id=<string>
```

---

### Parameter Binding 

```typescript
class UsersController {
  @route.post()
  login(username:string, password:string){

  }
}
```

```
POST /users/login
request body:
{ username: "johndoe", password: "secret123" }
```

---

### Domain Model Binding

```typescript
@domain()
class LoginUser {
  constructor(public username:string, public password:string){}
}

class UsersController {
  @route.post()
  login(data:LoginUser){

  }
}
```

```
POST /users/login
request body:
{ username: "johndoe", password: "secret123" }
```

---

### Built-in Validation

```typescript
class User {
  constructor(
    public name:string,
    @val.email()
    @val.unique()
    public email:string,
    public address:string,
    public isActive:boolean,
    public role: "User" | "Admin" | "SuperAdmin"
  ){}
}
```

@[4-5](Decorator validation)

---

### Built-In Authorization

```typescript
class UsersController {
  @authorize.public()
  @route.post()
  login(username:string, password:string){
    //other logic
    return {
      token: sign({id, role}, SECRET)
    }
  }

  @authorize.role("SuperAdmin")
  @route.post()
  deactivate(id:string){

  }
}
```

@[7](Setup authorization)
@[2](Boleh di akses oleh public)
@[11](Hanya SuperAdmin yang bisa mengakses)
---

### Parameter Authorization

```typescript
class User {
  constructor(
    public name:string,
    public email:string,
    public address:string,
    @authorize.role("Admin", "SuperAdmin")
    public isActive:boolean,
    @authorize.role("SuperAdmin")
    public role: "User" | "Admin" | "SuperAdmin"
  ){}
}
```
@[6](Hanya SuperAdmin yang bisa mengubah nilainya)
@[8](Hanya Admin dan SuperAdmin yang bisa mengubah nilainya)
---
