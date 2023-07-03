<div class="container mt-5">
    <form class method="post">
        <div class="row justify-content-center">
            <div class="col-md-3 text-center">
                <div class="form-group">
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required value="<?php echo isset($_COOKIE['remembered_email']) ? $_COOKIE['remembered_email'] : ''; ?>">
                </div>
            </div>
        </div>
        <br>
        <div class="row justify-content-center">
            <div class="col-md-3 text-center">
                <div class="form-group">
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-3 text-center">
                <div class="form-group form-check">
                    <input type="checkbox" name="remember" class="form-check-input" id="rememberCheckbox" <?php if(isset($_COOKIE['remembered_email'])) echo 'checked'; ?>>
                    <label class="form-check-label" for="rememberCheckbox">Remember me</label>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-3 text-center">
                <a hrefhref="#" onclick="loadContent('register.html')" style="font-size: smaller; color: blue;">Noch kein Mitglied?</a>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-3 text-center">
                <button type="submit" class="btn btn-primary" onclick="checkLogin()">Submit</button>
            </div>
        </div> 
    </form>
</div>
