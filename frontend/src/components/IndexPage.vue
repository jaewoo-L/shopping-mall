<template>
  <div id="main">
    <div class="background">
    </div>
    <div class="title">
      <h3>
        <strong>New Arrivals</strong>
      </h3>
    </div>
    <div class="main-layout">
      <div class="info-1 container">
        <div class="row">
          <div class="col-sm-6 col-md-4">
            <div data-aos="fade-up" class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160674/5_uhndfa.jpg" alt="">
              <div class="caption">
                <p class="en">19fw traveler sweatshirts grey</p>
                <p>여행시 편의성을 고려한 디자인</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div data-aos="fade-up" class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160674/3_gqgxvk.jpg" alt="">
              <div class="caption">
                <p class="en">19fw light down parka beige</p>  
                <p>우수한 복원력과 보온성을 갖춘 다운파카로 한겨울에도 착용 가능한 제품</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div data-aos="fade-up" class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160675/11_uxi1eu.jpg" alt="">
              <div class="caption">
                <p class="en">19fw strap climbing pants khaki</p>
                <p>착용이 간편한 스트링 / 밴드 디자인</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="info-2">
        <div class="title">
          <h3>
            <strong>19-20 FALL / WINTER</strong>
            <em>JaeWOO의 새로운 컬렉션을 만나보세요.</em>
          </h3>
        </div>
        <div class="back-img">
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div data-aos="fade-up" class="thumbnail">
                <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160677/10_r2z1pk.png" alt="">
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div data-aos="fade-down" class="thumbnail">
                <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160680/9_hhl18d.png" alt="">
              </div>
            </div>
          </div>
        </div>
        
        <hr>
        <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div data-aos="fade-right" class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160678/7_x0etnh.png" alt="">
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div data-aos="fade-left" class="thumbnail">
              <img style="width:90%;" src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160673/1_ufriqt.jpg" alt="">
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div data-aos="fade-left" class="thumbnail">
              <img style="width:90%;" src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160677/12_ryco1g.jpg">
            </div>
          </div>
        </div>
        </div>
        
      </div>

      <div class="info-3 container">
        <div class="title">
          <h3>
            <strong>JaeWoo Magazine</strong>
            <em>19-20 fall / winter</em>
          </h3>
        </div>
        <div data-aos="fade-up" class="row">
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160673/2_ee8gkm.jpg" alt="">
              <div class="caption">
                <p class="en">New Arrivals</p>
                <p>19/20 fall & winter 새로운 시즌이 시작되었습니다.</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160673/4_ahtkuj.jpg" alt="">
              <div class="caption">
                <p class="en">Archive</p>
                <p>엄선된 원사선택, 까다로운 편직, 염색, 후가공 공정을 거쳐 완성된 최상급 퀄리티를 제공합니다.</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
              <img src="https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160674/6_cpqxy0.jpg" alt="">
              <div class="caption">
                <p class="en">Pop-up Show</p>
                <p>제품소개 및 전시하는 팝업스토어를 만나보세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- footer 만들고 지우기 -->
      <div style="height:20vh"></div>

    </div>


  </div>
</template>

<style>
  #main{
    margin:0;
    padding:0;
  }
  .background {
    opacity: 0.85;
    background-image: url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    color: #fff;
  }

  .title {
    padding-top: 250px;
    padding-bottom: 100px;
  }
  .title h3{
    font-size: 25px;
    line-height:1.5;
    text-align: center;
  }
  .title h3 strong{
    font-weight: 400;
  }
  .title h3 em {
    display: block;
    font-size: 20px;
  }

  .info-1 {
    width: 75%;
  }
  .info-2 .back-img{
    background-image: url('https://res.cloudinary.com/du8m0pgtu/image/upload/v1572160682/8_htcj8j.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
  }
  .info-2 .row {
    margin-top: 200px;
  }
  .thumbnail {
    border: none;
  }
  .thumbnail .caption .en {
    font-size: 20px;
    font-family: 'Shadows Into Light', cursive;
  }
</style>

<script>
export default {
  created () {
    
  },
  data () {
    return {
      show: false
    }
  }
}
</script>