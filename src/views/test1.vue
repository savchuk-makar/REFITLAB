<noindex>

    <?php if($route_name == 'catalog' || $route_name == 'index'){ ?>
    
    <div class="mobile-fixed-menu mobile-fixed-menu_catalog_filters-menu" >
        <div class="mobile-fixed-menu-header" >
            <span class="mobile-fixed-menu-header-close" ><i class="las la-arrow-left"></i></span>
            <span class="mobile-fixed-menu-header-title" ><?php echo $ULang->t('Фильтры'); ?></span>
        </div>
        <div class="mobile-fixed-menu-content" >
    
            <form class="modal-form-filter" >
    
              <div class="row" >
                 <div class="col-lg-4" >
                   <label>
                      <?php echo $ULang->t("Город или регион"); ?>
                   </label>
                 </div>
                 <div class="col-lg-5" >
    
                    <div class="modal-search-geo-container" >
                    <input type="text" class="form-control modal-search-geo-input" value="<?php echo $ULang->t($Geo->change()["name"], [ "table"=>"geo", "field"=>"geo_name" ] ); ?>" >
                    <div class="modal-search-geo-results" style="display: none;"></div>
                    </div>
    
                    <div class="select-box-city-options" >
    
                        <?php
    
                            if(isset($_SESSION["geo"]["data"]["city_id"])){
                                $city_areas = getAll("select * from uni_city_area where city_area_id_city=? order by city_area_name asc", [ intval($_SESSION["geo"]["data"]["city_id"]) ]);
                            }
    
                            if(isset($_SESSION["geo"]["data"]["city_id"])){
                                $city_metro = getAll("select * from uni_metro where city_id=? and parent_id!=0 Order by name ASC", [ intval($_SESSION["geo"]["data"]["city_id"]) ]);
                            }
    
    
                          if(isset($city_areas)){
                          ?>
    
                              <div class="uni-select" data-status="0" >
    
                                   <div class="uni-select-name" data-name="<?php echo $ULang->t("Район"); ?>" > <span><?php echo $ULang->t("Район"); ?></span> <i class="la la-angle-down"></i> </div>
                                   <div class="uni-select-list" >
                                       <?php
                                       foreach ($city_areas as $value) {
    
                                          if( isset($_GET['filter']['area']) ){
    
                                              if( in_array($value["city_area_id"], $_GET['filter']['area'] ) ){
                                                      $active = 'class="uni-select-item-active"'; $checked = 'checked=""';
                                              }else{
                                                      $active = ''; $checked = '';
                                              }
    
                                          }
    
                                          ?>
                                          <label <?php echo $active; ?> > <input type="checkbox" <?php echo $checked; ?> name="filter[area][]" value="<?php echo $value["city_area_id"]; ?>" > <span><?php echo $ULang->t( $value["city_area_name"], [ "table" => "uni_city_area", "field" => "city_area_name" ] ); ?></span> <i class="la la-check"></i> </label>
                                          <?php
                                       }
                                       ?>
                                   </div>
    
                              </div>
    
                          <?php
                          }
    
                          if(isset($city_metro)){
                          ?>
    
                              <div class="container-custom-search">
                                <input type="text" class="ads-create-input action-input-search-metro" placeholder="<?php echo $ULang->t("Поиск станций метро"); ?>">
                                <div class="custom-results SearchMetroResults" style="display: none;"></div>
                              </div>
    
                              <div class="ads-container-metro-station">
                                <?php
                                    if( isset($_GET['filter']['metro']) ){
                                        $getMetro = getAll("select * from uni_metro where id IN(".implode(',',$_GET['filter']['metro']).")");
    
                                        if(count($getMetro)){
                                          foreach ($getMetro as $key => $value) {
                                            $main = findOne("uni_metro", "id=?", [$value["parent_id"]]);
                                            if($main){
                                              echo '
                                                     <span><i style="background-color:'.$main["color"].';"></i>'.$value["name"].' <i class="las la-times ads-metro-delete"></i><input type="hidden" value="'.$value["id"].'" name="filter[metro][]"></span>
                                              ';
                                              }
                                          }
                                        }
                                    }
                                ?>
                              </div>
    
                          <?php
                          }
                        ?>
    
                    </div>
    
                    <input type="hidden" name="city_id" value="<?php echo isset($_SESSION["geo"]["data"]["city_id"]) ? $_SESSION["geo"]["data"]["city_id"] : 0; ?>" >
    
                    <div class="mb10" ></div>
    
                 </div>
              </div>
    
              <?php if(count($getCategoryBoard["category_board_id_parent"][0])){ ?>
              <div class="row" >
                 <div class="col-lg-4" >
                   <label>
                      <?php echo $ULang->t("Категория"); ?>
                   </label>
                 </div>
                 <div class="col-lg-5" >
    
                    <?php
                    $main_id_c = 0;
                    if($data["category"]["category_board_id"]){
                       $ids_cat = $CategoryBoard->reverseId($getCategoryBoard,$data["category"]["category_board_id"]);
                       $ids_cat = explode(',', $ids_cat);
                       $main_id_c = $ids_cat[0];
    
                       foreach ($ids_cat as $key => $value) {
                           $array_cats[$value] = $ids_cat[ $key + 1 ];
                       }
                    }
                    ?>
    
                    <div class="uni-select" data-status="0" >
    
                         <div class="uni-select-name" data-name="<?php echo $ULang->t("Не выбрано"); ?>" > <span><?php echo $ULang->t("Не выбрано"); ?></span> <i class="la la-angle-down"></i> </div>
                         <div class="uni-select-list" >
                             <label> <input type="radio" class="modal-filter-select-category" value="0" > <span><?php echo $ULang->t("Все категории"); ?></span> <i class="la la-check"></i> </label>
                             <?php
                             foreach ($getCategoryBoard["category_board_id_parent"][0] as $value) {
                                ?>
                                <label <?php if($value["category_board_id"] == $main_id_c){ echo 'class="uni-select-item-active"'; } ?> > <input type="radio" class="modal-filter-select-category" value="<?php echo $value["category_board_id"]; ?>" > <span><?php echo $ULang->t( $value["category_board_name"], [ "table" => "uni_category_board", "field" => "category_board_name" ] ); ?></span> <i class="la la-check"></i> </label>
                                <?php
                             }
                             ?>
                         </div>
    
                    </div>
    
                    <div class="select-box-subcategory" >
    
                        <?php
    
                          if($array_cats){
    
                             foreach ($array_cats as $id_main_cat => $id_sub_cat) {
    
                                   if($getCategoryBoard["category_board_id_parent"][$id_main_cat]){
                                   ?>
    
                                    <div class="uni-select" data-status="0" >
    
                                         <div class="uni-select-name" data-name="<?php echo $ULang->t("Не выбрано"); ?>" > <span><?php echo $ULang->t("Не выбрано"); ?></span> <i class="la la-angle-down"></i> </div>
                                         <div class="uni-select-list" >
                                             <label> <input type="radio" class="modal-filter-select-category" value="<?php echo $id_main_cat; ?>" > <span><?php echo $ULang->t("Все категории"); ?></span> <i class="la la-check"></i> </label>
                                             <?php
                                             foreach ($getCategoryBoard["category_board_id_parent"][$id_main_cat] as $value) {
                                                ?>
                                                <label <?php if($value["category_board_id"] == $id_sub_cat){ echo 'class="uni-select-item-active"'; } ?> > <input type="radio" class="modal-filter-select-category" value="<?php echo $value["category_board_id"]; ?>" > <span><?php echo $ULang->t( $value["category_board_name"], [ "table" => "uni_category_board", "field" => "category_board_name" ] ); ?></span> <i class="la la-check"></i> </label>
                                                <?php
                                             }
                                             ?>
                                         </div>
    
                                    </div>
    
                                   <?php
                                   }
    
                             }
    
                          }
    
                        ?>
    
                    </div>
    
                    <div class="mb15" ></div>
    
                 </div>
              </div>
              <?php } ?>
    
              <div class="select-box-filters" >
    
                  <?php
                  if($data["category"]["category_board_id"]){
                      if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_display_price"] ){
                      ?>
                      <div class="row" >
                         <div class="col-lg-4" >
                           <label>
                              <?php
                              if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_variant_price"] == 1 ){
                                echo $ULang->t('Зарплата');
                              }else{
                                echo $ULang->t('Цена');
                              }
                              ?>
                           </label>
                         </div>
                         <div class="col-lg-5" >
    
                            <div class="filter-input" >
                              <div><span><?php echo $ULang->t("от"); ?></span><input type="text" class="inputNumber" name="filter[price][from]" value="<?php if(isset($data["param_filter"]["filter"]["price"]["from"])) echo $data["param_filter"]["filter"]["price"]["from"]; ?>" /></div>
                              <div><span><?php echo $ULang->t("до"); ?></span><input type="text" class="inputNumber" name="filter[price][to]" value="<?php if(isset($data["param_filter"]["filter"]["price"]["to"])) echo $data["param_filter"]["filter"]["price"]["to"]; ?>" /></div>
                            </div>
    
                         </div>
                      </div>
                      <?php
                      }
                  }else{
                      ?>
                      <div class="row" >
                         <div class="col-lg-4" >
                           <label>
                              <?php echo $ULang->t("Цена"); ?>
                           </label>
                         </div>
                         <div class="col-lg-5" >
    
                            <div class="filter-input" >
                              <div><span><?php echo $ULang->t("от"); ?></span><input type="text" class="inputNumber" name="filter[price][from]" value="<?php if(isset($data["param_filter"]["filter"]["price"]["from"])) echo $data["param_filter"]["filter"]["price"]["from"]; ?>" /></div>
                              <div><span><?php echo $ULang->t("до"); ?></span><input type="text" class="inputNumber" name="filter[price][to]" value="<?php if(isset($data["param_filter"]["filter"]["price"]["to"])) echo $data["param_filter"]["filter"]["price"]["to"]; ?>" /></div>
                            </div>
    
                         </div>
                      </div>
                      <?php
                  }
    
                  ?>
    
                  <div class="row mt15" >
                     <div class="col-lg-4" >
                       <label>
                          <?php echo $ULang->t("Статус"); ?>
                       </label>
                     </div>
                     <div class="col-lg-8" >
    
                        <div class="filter-items-spacing" >
    
                          <?php if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_secure"] && $settings["secure_status"] ){ ?>
                          <div class="custom-control custom-checkbox" >
                              <input type="checkbox" class="custom-control-input" name="filter[secure]" <?php if($data["param_filter"]["filter"]["secure"]){ echo 'checked=""'; } ?> id="mobileflsecure" value="1" >
                              <label class="custom-control-label" for="mobileflsecure"><?php echo $ULang->t("Безопасная сделка"); ?></label>
                          </div>
                          <?php } ?>
    
                          <?php if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_auction"] ){ ?>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" name="filter[auction]" <?php if($data["param_filter"]["filter"]["auction"]){ echo 'checked=""'; } ?> id="mobileflauction" value="1" >
                              <label class="custom-control-label" for="mobileflauction"><?php echo $ULang->t("Аукцион"); ?></label>
                          </div>
                          <?php } ?>
    
                          <?php if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_online_view"] ){ ?>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" name="filter[online_view]" <?php if($data["param_filter"]["filter"]["online_view"]){ echo 'checked=""'; } ?> id="mobileonline_view" value="1" >
                              <label class="custom-control-label" for="mobileonline_view"><?php echo $ULang->t("Онлайн-показ"); ?></label>
                          </div>
                          <?php } ?>
    
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" name="filter[vip]" <?php if($data["param_filter"]["filter"]["vip"]){ echo 'checked=""'; } ?> id="mobileflvip" value="1" >
                              <label class="custom-control-label" for="mobileflvip"><?php echo $ULang->t("VIP объявление"); ?></label>
                          </div>
    
                            <?php if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_booking"] ){ ?>
    
                                <?php
                                if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_booking_variant"] == 0 ){
                                ?>
    
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" name="filter[booking]" <?php if($data["param_filter"]["filter"]["booking"]){ echo 'checked=""'; } ?> id="mobileflbookingVariant" value="1" >
                                        <label class="custom-control-label" for="mobileflbookingVariant"><?php echo $ULang->t("Онлайн-бронирование"); ?></label>
                                    </div>
    
                                <?php }elseif( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_booking_variant"] == 1 ){ ?>
    
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" name="filter[booking]" <?php if($data["param_filter"]["filter"]["booking"]){ echo 'checked=""'; } ?> id="mobileflbookingVariant" value="1" >
                                        <label class="custom-control-label" for="mobileflbookingVariant"><?php echo $ULang->t("Онлайн-аренда"); ?></label>
                                    </div>
    
                                <?php } ?>
    
                            <?php } ?>
    
                        </div>
    
                     </div>
                  </div>
    
                    <?php if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_booking"] ){ ?>
    
                        <?php
                        if( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_booking_variant"] == 0 ){
    
                        ?>
    
                          <div class="row mt15 mb15" >
                             <div class="col-lg-4" >
                               <label>
                                  <?php echo $ULang->t("Даты"); ?>
                               </label>
                             </div>
                             <div class="col-lg-8" >
    
                                   <div class="filter-input" >
                                      <div><span><?php echo $ULang->t("с"); ?></span><input type="text" class="catalog-change-date-from" name="filter[date][start]" value="<?php if($data["param_filter"]["filter"]["date"]["start"]) echo date("d.m.Y", strtotime($data["param_filter"]["filter"]["date"]["start"])); ?>" /></div>
                                      <div><span><?php echo $ULang->t("по"); ?></span><input type="text" class="catalog-change-date-to" name="filter[date][end]" value="<?php if($data["param_filter"]["filter"]["date"]["end"]) echo date("d.m.Y", strtotime($data["param_filter"]["filter"]["date"]["end"])); ?>" /></div>
                                    </div>
    
                             </div>
                          </div>
    
                        <?php }elseif( $getCategoryBoard["category_board_id"][ $data["category"]["category_board_id"] ]["category_board_booking_variant"] == 1 ){ ?>
    
                          <div class="row mt15 mb15" >
                             <div class="col-lg-4" >
                               <label>
                                  <?php echo $ULang->t("Даты"); ?>
                               </label>
                             </div>
                             <div class="col-lg-8" >
    
                                   <div class="filter-input" >
                                      <div><span><?php echo $ULang->t("с"); ?></span><input type="text" class="catalog-change-date-from" name="filter[date][start]" value="<?php if($data["param_filter"]["filter"]["date"]["start"]) echo date("d.m.Y", strtotime($data["param_filter"]["filter"]["date"]["start"])); ?>" /></div>
                                      <div><span><?php echo $ULang->t("по"); ?></span><input type="text" class="catalog-change-date-to" name="filter[date][end]" value="<?php if($data["param_filter"]["filter"]["date"]["end"]) echo date("d.m.Y", strtotime($data["param_filter"]["filter"]["date"]["end"])); ?>" /></div>
                                    </div>
    
                             </div>
                          </div>
    
                        <?php } ?>
    
                    <?php } ?>
    
                  <?php if($route_name == 'catalog'){ ?>
                  <?php echo $Filters->load_filters_catalog( $data["category"]["category_board_id"] , $data["param_filter"], "filters_modal" ); ?>
                  <?php } ?>
    
              </div>
    
              <div class="row mt15" >
                 <div class="col-lg-4" >
                   <label>
                      <?php echo $ULang->t("Срок размещения"); ?>
                   </label>
                 </div>
                 <div class="col-lg-8" >
    
                      <div class="custom-control custom-radio">
                          <input type="radio" class="custom-control-input" name="filter[period]" <?php if($data["param_filter"]["filter"]["period"] == 1){ echo 'checked=""'; } ?> id="mobileflPeriod1" value="1" >
                          <label class="custom-control-label" for="mobileflPeriod1"><?php echo $ULang->t("За 24 часа"); ?></label>
                      </div>
    
                      <div class="custom-control custom-radio">
                          <input type="radio" class="custom-control-input" name="filter[period]" <?php if($data["param_filter"]["filter"]["period"] == 7){ echo 'checked=""'; } ?> id="mobileflPeriod2" value="7" >
                          <label class="custom-control-label" for="mobileflPeriod2"><?php echo $ULang->t("За 7 дней"); ?></label>
                      </div>
    
                      <div class="custom-control custom-radio">
                          <input type="radio" class="custom-control-input" name="filter[period]" <?php if(!isset($data["param_filter"]["filter"]["period"])){ echo 'checked=""'; } ?> id="mobileflPeriod3" value="" >
                          <label class="custom-control-label" for="mobileflPeriod3"><?php echo $ULang->t("За все время"); ?></label>
                      </div>
    
                 </div>
              </div>
    
              <input type="hidden" name="id_c" value="<?php echo $data["category"]["category_board_id"]; ?>" >
    
              <div class="mt30 mb30" >
    
                    <div><button class="btn-custom btn-color-blue width100" > <?php echo $ULang->t("Применить"); ?> </button></div>
    
                    <?php if($data["param_filter"]["filter"] && !$data["filter"]){ ?>
                    <div><button class="btn-custom btn-color-light action-clear-filter mt5 width100" > <?php echo $ULang->t("Сбросить"); ?> </button></div>
                    <?php } ?>
    
              </div>
    
            </form>
    
        </div>
    </div>
    
    <?php } ?>
    
    <div class="mobile-fixed-menu mobile-fixed-menu_all-menu" >
        <div class="mobile-fixed-menu-header" >
            <span class="mobile-fixed-menu-header-close" ><i class="las la-arrow-left"></i></span>
            <span class="mobile-fixed-menu-header-title" ><?php echo $ULang->t('Меню'); ?></span>
        </div>
        <div class="mobile-fixed-menu-content bg-gray no-padding" >
    
           <div class="mobile-fixed-menu-content-bg-white" >
    
           <?php
           if($_SESSION["profile"]["id"]){
    
             if($route_name == 'profile'){
             ?>
    
                 <div class="mobile-fixed-menu-user-link deny-margin-15" >
                   <?php
                      echo $Profile->outUserMenu($data,$_SESSION["profile"]["data"]["clients_balance"]);
                   ?>
                 </div>
    
             <?php
             }else{
             ?>
                 <div class="mobile-fixed-menu-content-card-user" >
                     <div><span class="medium-avatar-img" ><img src="<?php echo $Profile->userAvatar($_SESSION["profile"]["data"]); ?>" /></span></div>
                     <div><strong><?php echo $_SESSION["profile"]["data"]["clients_name"]; ?> <?php echo $_SESSION["profile"]["data"]["clients_surname"]; ?></strong></div>
                     <a class="mt15 card-user-link-profile" href="<?php echo _link("user/".$_SESSION["profile"]["data"]["clients_id_hash"]); ?>" ><?php echo $ULang->t("Профиль"); ?></a>
                     <a class="mt15 card-user-link-logout" href="<?php echo _link( "user/" . $_SESSION["profile"]["data"]["clients_id_hash"] . "/?logout=1" ); ?>" >
                         <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#333" d="M14.936 2c.888 0 1.324.084 1.777.326.413.221.74.548.96.961.243.453.327.889.327 1.777V8h-1V5.064c0-.737-.054-1.017-.208-1.305a1.319 1.319 0 0 0-.551-.551C15.953 3.054 15.673 3 14.936 3l-6.375-.001 1.773 1.007c.558.317.8.495 1.036.753.223.245.384.522.487.837.109.332.143.631.143 1.273v11.13l2.936.001c.737 0 1.017-.054 1.305-.208.239-.128.423-.312.551-.551.154-.288.208-.568.208-1.305V13h1v2.936c0 .888-.084 1.324-.326 1.777a2.31 2.31 0 0 1-.961.96c-.453.243-.889.327-1.777.327L12 18.999v.484a2.5 2.5 0 0 1-3.735 2.173L5.666 20.18c-.558-.317-.8-.495-1.036-.753a2.276 2.276 0 0 1-.487-.837C4.034 18.258 4 17.959 4 17.317V4.703c0-.126.01-.25.027-.371.043-.438.135-.738.3-1.045.22-.413.547-.74.96-.96C5.74 2.083 6.176 2 7.064 2h7.872zM6.5 3.203c-.75 0-1.373.552-1.483 1.272-.011.158-.017.35-.017.589v10.872h-.001L5 17.317c0 .546.023.747.093.962.06.181.149.334.277.475.152.167.316.287.79.556l2.599 1.477A1.5 1.5 0 0 0 11 19.483V6.869c0-.546-.023-.747-.093-.962a1.292 1.292 0 0 0-.277-.475c-.152-.167-.316-.287-.79-.556L7.241 3.399a1.503 1.503 0 0 0-.741-.196zM20 8.493l1.3 1.3.707.707L20 12.507l-.707-.707.798-.8H14v-1h6.093l-.8-.8.707-.707z"></path></svg>
                     </a>
                 </div>
             <?php
             }
    
           }elseif($settings["bonus_program"]["register"]["status"]){
             ?>
             <div class="mobile-fixed-menu-content-card-user" >
                 <h6><?php echo $ULang->t("Зарегистрируйтесь на нашем сайте"); ?></h6>
                 <p><?php echo $ULang->t("и получите"); ?> <strong><?php echo $Main->price($settings["bonus_program"]["register"]["price"]); ?></strong> <?php echo $ULang->t("на свой бонусный счет!"); ?></p>
                 <a class="card-user-link-profile" href="<?php echo _link("auth"); ?>" ><?php echo $ULang->t("Войти или зарегистрироваться"); ?></a>
             </div>
             <?php
           }else{
             ?>
             <div class="mobile-fixed-menu-content-card-user" >
                 <h6><?php echo $ULang->t("Личный кабинет"); ?></h6>
                 <div><span class="medium-avatar-img" ><i class="las la-user"></i></span></div>
                 <a href="<?php echo _link("auth"); ?>" ><?php echo $ULang->t("Войти или зарегистрироваться"); ?></a>
             </div>
             <?php
           }
           ?>
    
           <hr>
    
           <?php if($settings["visible_lang_site"]){ ?>
           <label class="mr10" ><?php echo $ULang->t("Язык:"); ?></label>
           <select class="gray-select change-lang-select" >
    
                <?php
                  $getLang = getAll("select * from uni_languages where status=?", [1]);
                  if(count($getLang)){
                     foreach ($getLang as $key => $value) {
                        ?>
                        <option <?php if($_SESSION["langSite"]["iso"] == $value["iso"]){ echo 'selected=""'; } ?> value="<?php echo trim($config["urlPath"] . "/" . $value["iso"] . "/" . REQUEST_URI, "/"); ?>" ><?php echo $value["name"]; ?></option>
                        <?php
                     }
                  }
                ?>
    
           </select>
           <?php } ?>
    
          <div class="deny-margin-15 mobile-fixed-menu-content-link" >
    
          <a href="<?php echo _link(); ?>" ><?php echo $ULang->t('Главная'); ?></a>
    
          <?php if( count($settings["frontend_menu"]) ){
    
              foreach ($settings["frontend_menu"] as $key => $value) {
                 $link = strpos($value["link"], "http") !== false ? $value["link"] : _link($value["link"]);
                 $target = strpos($value["link"], "http") !== false ? 'target="_blank"' : '';
                 ?>
                 <a href="<?php echo $link; ?>" <?php echo $target; ?> ><?php echo $ULang->t($value["name"]); ?></a>
                 <?php
              }
    
          }
          ?>
    
          <a href="<?php echo _link('ad/create'); ?>" ><?php echo $ULang->t('Добавить объявление'); ?> <i class="las la-angle-right"></i></a>
    
          </div>
    
          </div>
    
          <div class="mobile-fixed-menu-content-footer-link" >
    
              <a href="<?php echo _link("rules"); ?>"><?php echo $ULang->t("Правила сервиса"); ?></a>
              <a href="<?php echo _link("polzovatelskoe-soglashenie"); ?>"><?php echo $ULang->t("Пользовательское соглашение"); ?></a>
              <a href="<?php echo _link("feedback"); ?>"><?php echo $ULang->t("Служба поддержки"); ?></a>
    
          </div>
    
        </div>
    </div>
    
    <?php if($settings["marketplace_view_cart"] == 'sidebar'){ ?>
    
    <div class="sidebar-cart-bg" style="display: none;" >
    
      <div class="sidebar-cart" >
    
        <div class="sidebar-cart-header" >
    
          <span class="sidebar-cart-close" ><i class="las la-times"></i></span>
    
          <h5><?php echo $ULang->t("Корзина товаров"); ?></h5>
          <p class="cart-info" ></p>
    
        </div>
    
        <div class="sidebar-cart-content" >
    
          <div class="cart-container" ></div>
    
        </div>
    
      </div>
    
    </div>
    
    <?php }elseif($settings["marketplace_view_cart"] == 'modal'){ ?>
    
    <div class="modal-custom-bg" id="modal-cart" style="display: none;" >
        <div class="modal-custom" style="max-width: 750px;" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-cart-header" >
              <h5><?php echo $ULang->t("Корзина товаров"); ?></h5>
              <p class="cart-info" ></p>
          </div>
    
          <div class="cart-container mt20" ></div>
    
        </div>
    </div>
    
    <?php }elseif($settings["marketplace_view_cart"] == 'page'){ ?>
    
    <div class="modal-custom-bg bg-click-close" style="display: none;" id="modal-notification-cart" >
        <div class="modal-custom animation-modal" style="max-width: 500px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-notification-content" >
              <i class="las la-check"></i>
    
              <h4 class="modal-notification-text" ><?php echo $ULang->t("Товар успешно добавлен"); ?></h4>
          </div>
    
          <div class="mt20" ></div>
    
          <div class="row" >
             <div class="col-lg-6" >
               <button class="button-style-custom schema-color-button color-light button-click-close mb10" ><?php echo $ULang->t("Продолжить покупки"); ?></button>
             </div>
             <div class="col-lg-6" >
               <a href="<?php echo _link('cart'); ?>" class="button-style-custom schema-color-button color-blue mb10" ><?php echo $ULang->t("Перейти в корзину"); ?></a>
             </div>
          </div>
    
        </div>
    </div>
    
    <?php } ?>
    
    
    <div class="modal-custom-bg bg-click-close" style="display: none;" id="modal-order-accept" >
        <div class="modal-custom animation-modal" style="max-width: 500px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-notification-content" >
              <i class="las la-check"></i>
    
              <h4 class="modal-notification-text" ><?php echo $ULang->t("Заказ успешно создан!"); ?></h4>
          </div>
    
          <div class="mt20" ></div>
    
          <div class="row" >
             <div class="col-lg-6" >
               <button class="button-style-custom schema-color-button color-light button-click-close mb10" ><?php echo $ULang->t("Закрыть"); ?></button>
             </div>
             <div class="col-lg-6" >
               <a href="<?php echo _link( "user/" . $_SESSION["profile"]["data"]["clients_id_hash"] . "/orders" ); ?>" class="button-style-custom schema-color-button color-blue mb10" ><?php echo $ULang->t("Перейти к заказам"); ?></a>
             </div>
          </div>
    
        </div>
    </div>
    
    <div class="mobile-box-register-bonus" data-status="<?php echo intval($settings["bonus_program"]["register"]["status"]); ?>" >
    
       <span class="mobile-box-register-bonus-close" ><i class="las la-times"></i></span>
    
       <h5><?php echo $ULang->t("Зарегистрируйтесь на нашем сайте"); ?></h5>
    
       <p><?php echo $ULang->t("и получите"); ?> <strong><?php echo $Main->price($settings["bonus_program"]["register"]["price"]); ?></strong> <?php echo $ULang->t("на свой бонусный счет!"); ?></p>
    
       <a href="<?php echo _link("auth"); ?>" class="btn-custom btn-color-white" ><?php echo $ULang->t("Зарегистрироваться"); ?></a>
    
    </div>
    
    <?php
    
    if($route_name == "catalog" || $route_name ==  "index" || $route_name ==  "ad_view" || $route_name ==  "profile" || $route_name ==  "blog" || $route_name ==  "blog_view"){
    
    ?>
    <div class="d-block d-lg-none" >
    <div class="floating-menu" >
    
       <div class="floating-menu-box" >
       <a href="<?php echo _link(); ?>" >
        <div>
          <div class="floating-menu-icon" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g><path fill-rule="evenodd" clip-rule="evenodd" d="M 23.5,9.5 C 23.5,10.1667 23.5,10.8333 23.5,11.5C 22.5041,11.5858 21.6708,11.2524 21,10.5C 20.5012,14.4862 20.3345,18.4862 20.5,22.5C 14.5,22.5 8.5,22.5 2.5,22.5C 2.66551,18.4862 2.49885,14.4862 2,10.5C 1.32924,11.2524 0.495904,11.5858 -0.5,11.5C -0.5,10.8333 -0.5,10.1667 -0.5,9.5C 2.71537,7.89275 4.04871,5.22608 3.5,1.5C 5.4672,1.26057 7.30054,1.59391 9,2.5C 9.68909,1.64332 10.5224,0.97665 11.5,0.5C 15.5185,3.52435 19.5185,6.52435 23.5,9.5 Z M 10.5,3.5 C 13.3723,4.52561 15.8723,6.19228 18,8.5C 18.4988,12.4862 18.6655,16.4862 18.5,20.5C 13.8333,20.5 9.16667,20.5 4.5,20.5C 4.33449,16.4862 4.50115,12.4862 5,8.5C 6.81187,6.69974 8.6452,5.03308 10.5,3.5 Z" fill="currentColor" ></path></g>
            </svg>
          </div>
          <span class="floating-menu-icon-title" ><?php echo $ULang->t("Главная"); ?></span>
        </div>
       </a>
    
       <a <?php echo $Main->modalAuth(["attr"=>'href="'._link( "user/" . $_SESSION["profile"]["data"]["clients_id_hash"] . "/favorites" ).'"']); ?> >
        <div>
          <div class="floating-menu-icon" >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.026 4.133C4.398 4.578 3 6.147 3 8.537c0 3.51 2.228 6.371 4.648 8.432A23.633 23.633 0 0012 19.885a23.63 23.63 0 004.352-2.916C18.772 14.909 21 12.046 21 8.537c0-2.39-1.398-3.959-3.026-4.404-1.594-.436-3.657.148-5.11 2.642a1 1 0 01-1.728 0C9.683 4.281 7.62 3.697 6.026 4.133zM12 21l-.416.91-.003-.002-.008-.004-.027-.012a15.504 15.504 0 01-.433-.214 25.638 25.638 0 01-4.762-3.187C3.773 16.297 1 12.927 1 8.538 1 5.297 2.952 2.9 5.499 2.204c2.208-.604 4.677.114 6.501 2.32 1.824-2.206 4.293-2.924 6.501-2.32C21.048 2.9 23 5.297 23 8.537c0 4.39-2.772 7.758-5.352 9.955a25.642 25.642 0 01-4.762 3.186 15.504 15.504 0 01-.432.214l-.027.012-.008.004-.003.001L12 21zm0 0l.416.91c-.264.12-.568.12-.832 0L12 21z" fill="currentColor"></path></svg>
          </div>
          <span class="floating-menu-icon-title" ><?php echo $ULang->t("Избранное"); ?></span>
        </div>
       </a>
    
       <a <?php echo $Main->modalAuth(["attr"=>'class="floating-menu-ad-create" href="'._link( "ad/create" ).'"', "class"=>"floating-menu-ad-create"]); ?> >
        <div>
          <div class="floating-menu-icon" >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g><path fill-rule="evenodd" clip-rule="evenodd" d="M 10.5,-0.5 C 11.1667,-0.5 11.8333,-0.5 12.5,-0.5C 12.5,3.16667 12.5,6.83333 12.5,10.5C 16.1667,10.5 19.8333,10.5 23.5,10.5C 23.5,11.1667 23.5,11.8333 23.5,12.5C 19.8333,12.5 16.1667,12.5 12.5,12.5C 12.5,16.1667 12.5,19.8333 12.5,23.5C 11.8333,23.5 11.1667,23.5 10.5,23.5C 10.5,19.8333 10.5,16.1667 10.5,12.5C 6.83333,12.5 3.16667,12.5 -0.5,12.5C -0.5,11.8333 -0.5,11.1667 -0.5,10.5C 3.16667,10.5 6.83333,10.5 10.5,10.5C 10.5,6.83333 10.5,3.16667 10.5,-0.5 Z" fill="currentColor" ></path></g>
              </svg>
          </div>
          <span class="floating-menu-icon-title" ><?php echo $ULang->t("Подать"); ?></span>
        </div>
       </a>
    
       <a <?php echo $Main->modalAuth(["attr"=>'class="open-modal" href="#" data-id-modal="modal-chat-user"']); ?> >
        <div>
          <div class="floating-menu-icon" >
            <span class="label-count-message chat-message-counter BadgePulse" style="display: none;" ></span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.324 4.388C5.104 2.758 7.918 2 12 2s6.897.757 8.676 2.388C22.483 6.045 23 8.394 23 11c0 2.38-.43 4.548-1.89 6.174-1.463 1.628-3.782 2.515-7.098 2.757-.929.068-1.267.096-1.473.143a2.527 2.527 0 00-.583.2c-.194.09-.407.228-1.014.633l-4.387 2.925A1 1 0 015 23v-4.254c-1.407-.697-2.402-1.683-3.045-2.934C1.237 14.415 1 12.769 1 11c0-2.606.517-4.955 2.324-6.612zm1.352 1.474C3.483 6.955 3 8.606 3 11c0 1.619.222 2.902.734 3.898.495.962 1.3 1.734 2.64 2.273a1 1 0 01.626.927v3.034l2.903-1.936c.51-.34.86-.573 1.213-.737.347-.16.6-.247.972-.333.38-.088.89-.125 1.66-.181l.118-.009c3.075-.224 4.787-1.02 5.756-2.099C20.595 14.754 21 13.189 21 11c0-2.394-.483-4.045-1.676-5.138C18.104 4.742 15.918 4 12 4c-3.918 0-6.103.743-7.324 1.862z" fill="currentColor"></path></svg>
          </div>
          <span class="floating-menu-icon-title" ><?php echo $ULang->t("Чат"); ?></span>
        </div>
       </a>
    
       <a <?php echo $Main->modalAuth(["attr"=>'href="'._link("user/".$_SESSION["profile"]["data"]["clients_id_hash"]).'"']); ?> >
        <div>
          <div class="floating-menu-icon" >
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" clip-rule="evenodd" d="M13.01 20.305c-5.105.586-9.51-3.37-9.51-8.442A8.507 8.507 0 018.788 3.99a5.453 5.453 0 005.288 4.123h.299a1 1 0 100-2h-.3a3.45 3.45 0 01-3.45-3.45v-1.29l-1.25.32A10.503 10.503 0 001.5 11.864c0 6.264 5.443 11.151 11.737 10.43 4.675-.537 8.503-4.26 9.156-8.913.505-3.6-.819-7.072-3.448-9.392a10.473 10.473 0 00-4.32-2.294 1 1 0 10-.5 1.937 8.473 8.473 0 013.496 1.857c2.132 1.88 3.202 4.687 2.791 7.613-.526 3.75-3.632 6.771-7.403 7.204zm-6.72-8.497c.19.181.45.292.71.292.26 0 .52-.11.71-.292.18-.191.29-.453.29-.714 0-.262-.11-.524-.29-.715a1.042 1.042 0 00-1.42 0c-.18.191-.29.453-.29.715 0 .261.11.523.29.714zm10 .002c.19.18.45.29.71.29.26 0 .52-.11.71-.29.09-.1.16-.21.21-.331.05-.12.08-.25.08-.38s-.03-.261-.08-.381-.12-.23-.21-.33c-.1-.091-.2-.161-.33-.211-.37-.16-.81-.06-1.09.21-.09.1-.16.21-.21.33-.05.12-.08.251-.08.381s.03.26.08.381c.05.12.12.23.21.33zm-7.497 4.995a1 1 0 111.414-1.415c.99.99 2.596.99 3.586 0a1 1 0 011.414 1.415 4.537 4.537 0 01-6.414 0z" fill="currentColor"></path></svg>
          </div>
          <span class="floating-menu-icon-title" ><?php echo $ULang->t("Профиль"); ?></span>
        </div>
       </a>
       </div>
    
    </div>
    </div>
    <?php
    }elseif($route_name ==  "shop"){
        if(!$data["user_status_subscribe"]){
            ?>
            <div class="d-block d-lg-none" >
             <div class="floating-link" >
                <span <?php echo $Main->modalAuth(["attr"=>'class="btn-color-green user-subscribe" data-shop="'.$data["shop"]["clients_shops_id"].'" data-id="'.$data["shop"]["clients_shops_id_user"].'"', "class"=>"btn-color-green"]); ?> ><?php echo $ULang->t("Подписаться"); ?></span>
             </div>
            </div>
            <?php
        }
    }
    ?>
    
    <div class="modal-custom-bg" id="modal-auth" style="display: none;" >
        <div class="modal-custom" style="max-width: 400px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-auth-content" >
    
             <?php include $config["template_path"] . "/include/auth.php"; ?>
    
          </div>
    
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close" style="display: none;" id="modal-notification" >
        <div class="modal-custom animation-modal" style="max-width: 400px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-notification-content" >
              <i class="las la-check"></i>
    
              <h4 class="modal-notification-text" ></h4>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close"  id="modal-auth-block" style="display: none;" >
        <div class="modal-custom animation-modal" style="max-width: 450px;" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <h4 style="color: red;" > <strong><?php echo $ULang->t("Ваш аккаунт заблокирован!"); ?></strong> </h4>
    
          <div class="mt30" ></div>
    
          <p><?php echo $ULang->t("Если вы не согласны с нашим решением — напишите в службу поддержки"); ?></p>
    
          <div class="mt30" ></div>
    
          <div class="row" >
             <div class="col-lg-7" >
               <a class="button-style-custom schema-color-button color-green mb10" href="<?php echo _link("feedback"); ?>" ><?php echo $ULang->t("Написать в поддержку"); ?></a>
             </div>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close"  id="modal-auth-delete" style="display: none;" >
        <div class="modal-custom animation-modal" style="max-width: 450px;" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <h4 style="color: red;" > <strong><?php echo $ULang->t("Ваш аккаунт удален!"); ?></strong> </h4>
    
          <div class="mt30" ></div>
    
          <div class="row" >
             <div class="col-lg-7" >
               <a class="button-style-custom schema-color-button color-green mb10" href="<?php echo _link("feedback"); ?>" ><?php echo $ULang->t("Написать в поддержку"); ?></a>
             </div>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close"  id="modal-balance" style="display: none;" >
        <div class="modal-custom animation-modal" style="max-width: 500px;" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="text-center" >
            <span class="circle-icon" > <i class="las la-wallet"></i> </span>
          </div>
    
          <h4 class="text-center" > <strong><?php echo $ULang->t("Недостаточно средств для оплаты!"); ?></strong> </h4>
    
          <div class="mt30" ></div>
    
          <h6 class="text-center" ><?php echo $ULang->t("Ваш баланс"); ?> <strong class="modal-balance-summa" ></strong> </h6>
    
          <div class="mt30" ></div>
    
          <div class="row" >
             <div class="col-lg-3" ></div>
             <div class="col-lg-6" >
               <a class="button-style-custom schema-color-button color-green mb10" href="<?php echo _link("user/".$_SESSION["profile"]["data"]["clients_id_hash"]."/balance"); ?>" ><?php echo $ULang->t("Пополнить"); ?></a>
             </div>
             <div class="col-lg-3" ></div>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close"  id="modal-services-access" style="display: none;" >
        <div class="modal-custom animation-modal" style="max-width: 500px;" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="text-center" >
            <span class="circle-icon" > <i class="las la-check"></i> </span>
          </div>
    
          <h4 class="text-center" > <strong><?php echo $ULang->t("Услуга успешно подключена!"); ?></strong> </h4>
    
          <div class="mt30" ></div>
    
          <div class="row" >
             <div class="col-lg-3" ></div>
             <div class="col-lg-6" >
                <button class="button-style-custom schema-color-button width100 button-click-close color-light mb10" ><?php echo $ULang->t("Закрыть"); ?></button>
             </div>
             <div class="col-lg-3" ></div>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg"  id="modal-chat-user" style="display: none;" >
        <div class="modal-custom animation-modal" style="max-width: 900px; padding: 0px;" >
    
          <span class="modal-custom-close modal-chat-user-close" ><i class="las la-times"></i></span>
    
          <div class="modal-chat-user-content init-chat-body" ></div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close" style="display: none;" id="modal-chat-user-confirm-delete" >
        <div class="modal-custom animation-modal" style="max-width: 400px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-confirm-content" >
              <h4><?php echo $ULang->t("Вы действительно хотите удалить диалог?"); ?></h4>
          </div>
    
          <div class="mt30" ></div>
    
          <div class="modal-custom-button" >
             <div>
               <button class="button-style-custom btn-color-danger chat-user-delete schema-color-button" ><?php echo $ULang->t("Удалить"); ?></button>
             </div>
             <div>
               <button class="button-style-custom color-light button-click-close" ><?php echo $ULang->t("Отменить"); ?></button>
             </div>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close" style="display: none;" id="modal-chat-user-confirm-block" >
        <div class="modal-custom animation-modal" style="max-width: 400px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-confirm-content" >
              <h4><?php echo $ULang->t("Внести пользователя в чёрный список?"); ?></h4>
              <p class="mt15" ><?php echo $ULang->t("Пользователь не сможет писать вам в чатах и оставлять комментарии к объявлениям."); ?></p>
          </div>
    
          <div class="mt30" ></div>
    
          <div class="modal-custom-button" >
             <div>
               <button class="button-style-custom color-blue chat-user-block schema-color-button" ><?php echo $ULang->t("Внести"); ?></button>
             </div>
             <div>
               <button class="button-style-custom color-light button-click-close" ><?php echo $ULang->t("Отменить"); ?></button>
             </div>
          </div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg" style="display: none;" id="modal-complaint" >
        <div class="modal-custom width550 animation-modal" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-complaint" >
    
          <form method="post" class="modal-complaint-form" >
    
               <h4><?php echo $ULang->t("Сообщить о нарушении"); ?></h4>
    
               <div class="textarea-custom mt20" >
    
                   <textarea placeholder="<?php echo $ULang->t("Опишите подробности нарушения"); ?>" name="text" ></textarea>
                   <div class="textarea-custom-actions text-right" >
                     <button class="btn-custom-mini color-light" ><?php echo $ULang->t("Отправить"); ?></button>
                   </div>
    
               </div>
    
              <input type="hidden" name="id" value="0" >
              <input type="hidden" name="action_complain" value="" >
              <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>" >
    
          </form>
    
          <div class="modal-complaint-notification" >
              <i class="las la-check"></i>
              <h4></h4>
          </div>
    
          </div>
    
    
        </div>
    </div>
    
    <div class="modal-custom-bg" style="display: none;" id="modal-delivery-point" >
        <div class="modal-custom width850 animation-modal" >
    
            <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
            <h4><?php echo $ULang->t("Пункты получения"); ?></h4>
    
            <div class="container-custom-search" >
              <input type="text" autocomplete="nope" class="form-control mt15 action-input-search-delivery-city" placeholder="Город" >
              <div class="custom-results SearchDeliveryCityResults" ></div>
            </div>
    
            <div class="modal-delivery-point-map mt15" >
    
                <div class="modal-delivery-point-map-init" id="modal-delivery-point-map-init" >
                <div class="modal-delivery-point-preload-spinner" >
                    <div class="spinner-grow preload-spinner" role="status">
                      <span class="sr-only"></span>
                    </div>
                </div>
                </div>
    
            </div>
    
            <input type="hidden" name="map_vendor" value="<?php echo $settings['map_vendor']; ?>" >
            <input type="hidden" name="map_vendor_key" value="<?php if($settings['map_vendor'] == 'google'){ echo $settings['map_google_key']; }elseif($settings['map_vendor'] == 'openstreetmap'){ echo $settings['map_openstreetmap_key']; } ?>" >
    
        </div>
    </div>
    
    <div class="modal-custom-bg" style="display: none;" id="modal-user-story-add" >
        <div class="modal-custom animation-modal" style="max-width: 450px" >
    
            <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
            <?php
    
            if($settings["user_stories_paid_add"] && $settings["user_stories_price_add"] && !isset($_SESSION['profile']['tariff']['services']['stories'])){
    
                if($settings["user_stories_free_add"]){
                    ?>
                    <div class="h5 text-center" ><?php echo $ULang->t("Стоимость размещения сториса"); ?> <?php echo $Main->price($settings["user_stories_price_add"]); ?></div>
                    <p class="text-center" ><?php echo $ULang->t("Бесплатно доступно"); ?> <?php echo $settings["user_stories_free_add"] . ' ' . ending($settings["user_stories_free_add"], $ULang->t('размещение'), $ULang->t('размещения'), $ULang->t('размещений')); ?></p>
                    <?php
                }else{
                    ?>
                    <p><?php echo $ULang->t("Стоимость размещения сториса"); ?> <?php echo $Main->price($settings["user_stories_price_add"]); ?></p>
                    <?php
                }
    
            } ?>
    
            <div class="modal-user-story-add-actions mt25" >
    
                <button class="button-style-custom btn-color-blue-light schema-color-button action-user-story-image-add" ><?php echo $ULang->t("Добавить фото"); ?></button>
    
                <button class="button-style-custom btn-color-blue-light schema-color-button action-user-story-video-add mt10" ><?php echo $ULang->t("Добавить видео"); ?></button>
    
                <form class="modal-user-story-image-form" >
                    <input type="file" name="story_media" accept=".png,.jpg,.jpeg" >
                </form>
    
                <form class="modal-user-story-video-form" >
                    <input type="file" name="story_media" accept=".mp4,.mov,.avi" >
                </form>
    
            </div>
    
        </div>
    </div>
    
    <div class="modal-view-user-stories" style="display: none;" >
        <div class="modal-view-user-stories-container" ></div>
    </div>
    
    
    <div class="modal-user-story-add-maker" style="display: none;" >
        <div class="modal-user-story-add-container-maker" >
    
          <div class="spinner-grow preload-spinner" role="status"><span class="sr-only"></span></div>
    
        </div>
    </div>
    
    <div class="modal-custom-bg bg-click-close" style="display: none;" id="modal-user-story-confirm-delete" >
        <div class="modal-custom animation-modal" style="max-width: 400px" >
    
          <span class="modal-custom-close" ><i class="las la-times"></i></span>
    
          <div class="modal-confirm-content" >
              <h4><?php echo $ULang->t("Вы действительно хотите удалить сторис?"); ?></h4>
          </div>
    
          <div class="mt30" ></div>
    
          <div class="modal-custom-button" >
             <div>
               <button class="button-style-custom btn-color-danger user-story-delete schema-color-button" ><?php echo $ULang->t("Удалить"); ?></button>
             </div>
             <div>
               <button class="button-style-custom color-light button-click-close" ><?php echo $ULang->t("Отменить"); ?></button>
             </div>
          </div>
    
        </div>
    </div>
    
    <div class="lang-js-1 lang-js" ><?php echo $ULang->t("Аукцион завершен"); ?></div>
    <div class="lang-js-2 lang-js" ><?php echo $ULang->t("минут"); ?></div>
    <div class="lang-js-3 lang-js" ><?php echo $ULang->t("секунд"); ?></div>
    <div class="lang-js-4 lang-js" ><?php echo $ULang->t("Выбрано"); ?></div>
    <div class="lang-js-5 lang-js" ><?php echo $ULang->t("Добавить"); ?></div>
    <div class="lang-js-6 lang-js" ><?php echo $ULang->t("Аукцион завершен"); ?></div>
    <div class="lang-js-7 lang-js" ><?php echo $ULang->t("Скрыть параметры"); ?></div>
    <div class="lang-js-8 lang-js" ><?php echo $ULang->t("Все параметры"); ?></div>
    <div class="lang-js-9 lang-js" ><?php echo $ULang->t("Вы действительно хотите удалить страницу?"); ?></div>
    
    </noindex>
    
    <?php if( $visible_footer == true ){ ?>
    
    <?php if($settings["app_download_links"]["apk"] || $settings["app_download_links"]["apk"]){ ?>
    <div class="footer-app-box">
        <div class="h4" >
            <strong><?php echo $ULang->t("Мобильное приложение"); ?> <?php echo $settings["app_name_project"]; ?></strong>
        </div>
    
        <p><?php echo $ULang->t("Скачайте наше мобильное приложение и пользуйтесь всеми функциями прямо из телефона"); ?></p>
    
        <?php if($settings["app_download_links"]["apk"]){ ?>
        <a href="<?php echo $settings["app_download_links"]["apk"]; ?>" target="_blank" class="btn-custom btn-color-blue mt10" >
            <?php echo $ULang->t("Скачать приложение"); ?>
        </a>
        <?php }elseif(isset($settings["app_download_links"])){ ?>
    
        <div class="footer-app-box-logo" >
    
            <?php if(isset($settings["app_download_links"]["ru_store"])){ ?>
                <a href="<?php echo $settings["app_download_links"]["ru_store"]; ?>" target="_blank" ><img src="<?php echo $settings["path_tpl_image"]; ?>/app-rustore-logo.png"></a>
            <?php } ?>
    
            <?php if(isset($settings["app_download_links"]["play_market"])){ ?>
            <a href="<?php echo $settings["app_download_links"]["play_market"]; ?>" target="_blank" ><img src="<?php echo $settings["path_tpl_image"]; ?>/app-playmarket-logo.png"></a>
            <?php } ?>
    
            <?php if(isset($settings["app_download_links"]["app_store"])){ ?>
            <a href="<?php echo $settings["app_download_links"]["app_store"]; ?>" target="_blank" ><img src="<?php echo $settings["path_tpl_image"]; ?>/app-appstore-logo.png"></a>
            <?php } ?>
    
            <?php if(isset($settings["app_download_links"]["app_gallery"])){ ?>
            <a href="<?php echo $settings["app_download_links"]["app_gallery"]; ?>" target="_blank" ><img src="<?php echo $settings["path_tpl_image"]; ?>/app-appgallery-logo.png"></a>
            <?php } ?>
    
        </div>
    
        <?php } ?>
    </div>
    <?php } ?>
    
    <div class="footer-bg" >
    
    <footer>
       <div class="container" >
       <div class="row" >
    
         <div class="col-lg-9 col-12" >
    
            <p class="footer-list-text" >
              © <?php echo date("Y"); ?> <?php echo $settings["title"]; ?>
            </p>
    
            <div class="footer-list-link" >
              <a href="<?php echo _link("rules"); ?>"><?php echo $ULang->t("Правила сервиса"); ?></a>
              <a href="<?php echo _link("polzovatelskoe-soglashenie"); ?>"><?php echo $ULang->t("Пользовательское соглашение"); ?></a>
              <a href="<?php echo _link("feedback"); ?>"><?php echo $ULang->t("Служба поддержки"); ?></a>
              <a  type="button" class="btn text-decoration" data-toggle="modal" data-target="#myModal">Предложить тему</a>
            </div>

                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="manifest" href="/manifest.json">
                <script>
                    // Проверяем поддержку Service Worker и возможность установки PWA
                    if ('serviceWorker' in navigator && 'PushManager' in window) {
                        window.addEventListener('load', function() {
                            navigator.serviceWorker.register('/path/to/service-worker.js')
                            .then(function(registration) {
                                console.log('Service Worker зарегистрирован:', registration);
                            })
                            .catch(function(error) {
                                console.log('Ошибка при регистрации Service Worker:', error);
                            });
            
                            // Проверяем, было ли уже установлено PWA приложение
                            if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
                                console.log('PWA приложение уже установлено');
                            } else {
                                // Создаем кнопку для установки PWA
                                var installButton = document.createElement('button');
                                installButton.innerText = 'Установить PWA приложение';
                                installButton.addEventListener('click', function() {
                                    // Отображаем предложение установки PWA
                                    registration.prompt().then(function(choiceResult) {
                                        if (choiceResult.outcome === 'accepted') {
                                            console.log('Пользователь установил PWA приложение');
                                        } else {
                                            console.log('Пользователь отказался от установки PWA приложения');
                                        }
                                    });
                                });
                                document.body.appendChild(installButton);
                            }
                        });
                    }
                </script>
            

         </div>
    
         <div class="col-lg-3 col-12" >
    
                <?php if($Main->socialLink()){ ?>
                <div class="footer-list-social" >
                   <?php echo $Main->socialLink(); ?>
                </div>
                <?php } ?>
    
         </div>
    
       </div>
       </div>
    
    </footer>
    
    
    </div>
    
    
    <?php
    
      }
    
      echo $Main->assets($config["js_plugins"], 'js');
      echo $Main->pwa();
      echo $settings["code_script"];
    
    ?>
    <script>
        $(document).ready(function() {
    
        })
    </script>
    
    
    <!-- Модальное окно -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Предложить тему</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
    
    <div class="feedback-form" >
    
      <div class="feedback-success" >
        <strong><?php echo $ULang->t("Спасибо, ваше обращение принято!"); ?></strong><br>
        <?php echo $ULang->t("Специалист"); ?> <?php echo $settings["site_name"]; ?> <?php echo $ULang->t("ответит вам на указанный E-mail."); ?>
      </div>
    
      <form class="feedback" >
    
        <div class="row" >
           <div class="col-lg-4" >
              <label><?php echo $ULang->t("Выберите тему обращения"); ?></label>
           </div>
           <div class="col-lg-8" >
              <select class="form-control" name="subject" >
                 <option value="Не выбрано" ><?php echo $ULang->t("Не выбрано"); ?></option>
                 <option value="Предложить тему" ><?php echo $ULang->t("Предложить тему"); ?></option>
              </select>                          
           </div>
        </div>
        <div class="row mt15" >
           <div class="col-lg-4" >
              <label><?php echo $ULang->t("Обращение"); ?></label>
           </div>
           <div class="col-lg-8" >
              <textarea class="form-control" rows="4" name="text" ></textarea>                          
           </div>
        </div> 
        <div class="row mt15" >
           <div class="col-lg-4" >
              <label><?php echo $ULang->t("Как к вам можно обращаться?"); ?></label>
           </div>
           <div class="col-lg-8" >
              <input type="text" name="name" class="form-control" >                         
           </div>
        </div>
        <div class="row mt15" >
           <div class="col-lg-4" >
              <label><?php echo $ULang->t("Почта, на которую мы ответим"); ?></label>
           </div>
           <div class="col-lg-8" >
              <input type="text" name="email" class="form-control" >                          
           </div>
        </div>
        <div class="row mt15" >
           <div class="col-lg-4" ></div>
           <div class="col-lg-8" >
              <div class="captcha-container" >
                 <img class="captcha-update" src="" >   
              </div>                          
           </div>
        </div>
        <div class="row mt15" >
           <div class="col-lg-4" >
              <label><?php echo $ULang->t("Укажите код проверки"); ?></label>
           </div>
           <div class="col-lg-8" >
              <input type="text" name="code" class="form-control" >                          
           </div>
        </div>                                     
        <div class="row mt5" >
           <div class="col-lg-4" ></div>
           <div class="col-lg-8" >
              <hr> 
              <button class="btn-custom btn-color-blue" ><?php echo $ULang->t("Отправить обращение"); ?></button>                         
           </div>
        </div>
    
        <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>" >
    
      </form>
    </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>