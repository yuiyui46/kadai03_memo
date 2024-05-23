$(document).ready(function () {
    let currentPage = 1;
  
    function showPage(pageNumber) {
      $(".page").addClass("hidden");
      $("#page-" + pageNumber).removeClass("hidden");
  
      if (pageNumber === 1) {
        $("#prev").addClass("hidden");
        $("#next").removeClass("hidden");
        $("#save").addClass("hidden");
      } else {
        $("#prev").removeClass("hidden");
        $("#next").addClass("hidden");
        $("#save").removeClass("hidden");
  
        // チェックされた検診に応じて質問を表示
        $("#gas").is(":checked") ? $("#gas-questions").removeClass("hidden") : $("#gas-questions").addClass("hidden");
        $("#chest").is(":checked") ? $("#chest-questions").removeClass("hidden") : $("#chest-questions").addClass("hidden");
        $("#colo").is(":checked") ? $("#colo-questions").removeClass("hidden") : $("#colo-questions").addClass("hidden");
        $("#mammo").is(":checked") ? $("#mammo-questions").removeClass("hidden") : $("#mammo-questions").addClass("hidden");
        $("#cerv").is(":checked") ? $("#cerv-questions").removeClass("hidden") : $("#cerv-questions").addClass("hidden");
  
        // 分岐質問の表示
        if ($("#gas-detail-1").is(":checked") || $("#gas-detail-2").is(":checked") || $("#chest-detail-1").is(":checked") || $("#mammo-detail-1").is(":checked")) {
          $("#additional-questions-1").removeClass("hidden");
        } else {
          $("#additional-questions-1").addClass("hidden");
        }
  
        if ($("#cerv-detail-1").is(":checked") || $("#colo-detail-1").is(":checked")) {
          $("#additional-questions-2").removeClass("hidden");
        } else {
          $("#additional-questions-2").addClass("hidden");
        }
  
        // 一般的な質問を常に表示
        $("#general-questions").removeClass("hidden");
      }
    }
  
    $("#next").on("click", function () {
      currentPage++;
      showPage(currentPage);
    });
  
    $("#prev").on("click", function () {
      currentPage--;
      showPage(currentPage);
    });
  
    $("#save").on("click", function () {
      const syoku = $("#syoku").val();
      const shisetsu = $("#shisetsu").val();
      const tests = $("input[name='tests']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      const sonotaDetail = $("#sonota-detail").val();
  
      const gasDetails = $("input[name='gas-details']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      const chestDetails = $("input[name='chest-details']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      const coloDetails = $("input[name='colo-details']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      const mammoDetails = $("input[name='mammo-details']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      const cervDetails = $("input[name='cerv-details']:checked").map(function () {
        return this.value;
      }).get().join(", ");
  
      const additionalDetails1 = $("input[name='additional-details']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      const additionalDetails2 = $("input[name='additional-details-2']:checked").map(function () {
        return this.value;
      }).get().join(", ");
      
      const healthComment = $("#health-comment").val();
  
      const key = "healthData";
      const value = JSON.stringify({
        syoku,
        shisetsu,
        tests,
        sonotaDetail,
        gasDetails,
        chestDetails,
        coloDetails,
        mammoDetails,
        cervDetails,
        additionalDetails1,
        additionalDetails2,
        healthComment
      });
  
      localStorage.setItem(key, value);
      const html = `
      <li>
        <p>職種: ${syoku}</p>
        <p>施設種別: ${shisetsu}</p>
        <p>提供している検査: ${tests}</p>
        <p>その他のがん検診の詳細: ${sonotaDetail}</p>
        <p>胃がん検診の詳細: ${gasDetails}</p>
        <p>肺がん検診の詳細: ${chestDetails}</p>
        <p>大腸がん検診の詳細: ${coloDetails}</p>
        <p>乳がん検診の詳細: ${mammoDetails}</p>
        <p>子宮頸がん検診の詳細: ${cervDetails}</p>
        <p>受診者への説明など: ${additionalDetails1}</p>
        <p>受診者への説明など: ${additionalDetails2}</p>
        <p>コメント: ${healthComment}</p>
      </li>
      `;
      $("#list").append(html);
    });
  
    $("#clear").on("click", function () {
      localStorage.clear();
      $("#list").empty();
    });
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      const html = `
      <li>
        <p>職種: ${value.syoku}</p>
        <p>施設種別: ${value.shisetsu}</p>
        <p>提供している検査: ${value.tests}</p>
        <p>その他のがん検診の詳細: ${value.sonotaDetail}</p>
        <p>胃がん検診の詳細: ${value.gasDetails}</p>
        <p>肺がん検診の詳細: ${value.chestDetails}</p>
        <p>大腸がん検診の詳細: ${value.coloDetails}</p>
        <p>乳がん検診の詳細: ${value.mammoDetails}</p>
        <p>子宮頸がん検診の詳細: ${value.cervDetails}</p>
        <p>受診者への説明など: ${value.additionalDetails1}</p>
        <p>受診者への説明など: ${value.additionalDetails2}</p>
        <p>コメント: ${value.healthComment}</p>
      </li>
      `;
      $("#list").append(html);
    }
  
    showPage(currentPage);
  
    $("#sonota").on("change", function () {
      if (this.checked) {
        $("#sonota-text").removeClass("hidden");
        $("#sonota-detail").attr("required", true);
      } else {
        $("#sonota-text").addClass("hidden");
        $("#sonota-detail").removeAttr("required");
      }
    });
  });
  